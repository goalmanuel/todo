import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, TodoFilter } from '@/types/todo';
import { v4 as uuidv4 } from 'uuid';

interface TodoStore {
  todos: Todo[];
  filter: TodoFilter;
  searchQuery: string;

  // Getters
  getFilteredTodos: () => Todo[];
  getTodoById: (id: string) => Todo | undefined;
  getStats: () => { total: number; completed: number; active: number; overdue: number };
  getCategories: () => string[];

  // Actions
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: Partial<TodoFilter>) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
  deleteAll: () => void;
  importTodos: (todos: Todo[]) => void;
  exportTodos: () => string;
}

const useToStore = create<TodoStore>()(persist(
  (set, get) => ({
    todos: [],
    filter: {
      status: 'all',
      sortBy: 'date',
    },
    searchQuery: '',

    getFilteredTodos: () => {
      const { todos, filter, searchQuery } = get();
      let filtered = [...todos];

      // Filter by status
      if (filter.status === 'active') {
        filtered = filtered.filter(todo => !todo.completed);
      } else if (filter.status === 'completed') {
        filtered = filtered.filter(todo => todo.completed);
      }

      // Filter by category
      if (filter.category) {
        filtered = filtered.filter(todo => todo.category === filter.category);
      }

      // Filter by priority
      if (filter.priority) {
        filtered = filtered.filter(todo => todo.priority === filter.priority);
      }

      // Filter by search query
      if (searchQuery.trim()) {
        filtered = filtered.filter(
          todo =>
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort
      switch (filter.sortBy) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          filtered.sort(
            (a, b) =>
              (priorityOrder[a.priority as keyof typeof priorityOrder] ?? 3) -
              (priorityOrder[b.priority as keyof typeof priorityOrder] ?? 3)
          );
          break;
        case 'alphabetical':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'date':
        default:
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }

      return filtered;
    },

    getTodoById: (id: string) => {
      return get().todos.find(todo => todo.id === id);
    },

    getStats: () => {
      const { todos } = get();
      const now = new Date();
      const completed = todos.filter(todo => todo.completed).length;
      const active = todos.filter(todo => !todo.completed).length;
      const overdue = todos.filter(
        todo => !todo.completed && todo.dueDate && new Date(todo.dueDate) < now
      ).length;

      return {
        total: todos.length,
        completed,
        active,
        overdue,
      };
    },

    getCategories: () => {
      const { todos } = get();
      const categories = new Set<string>();
      todos.forEach(todo => {
        if (todo.category) categories.add(todo.category);
      });
      return Array.from(categories).sort();
    },

    addTodo: (todo) => {
      const now = new Date().toISOString();
      const newTodo: Todo = {
        ...todo,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
      };
      set(state => ({
        todos: [newTodo, ...state.todos],
      }));
    },

    updateTodo: (id: string, updates: Partial<Todo>) => {
      set(state => ({
        todos: state.todos.map(todo =>
          todo.id === id
            ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
            : todo
        ),
      }));
    },

    deleteTodo: (id: string) => {
      set(state => ({
        todos: state.todos.filter(todo => todo.id !== id),
      }));
    },

    toggleTodo: (id: string) => {
      set(state => ({
        todos: state.todos.map(todo =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        ),
      }));
    },

    setFilter: (filter: Partial<TodoFilter>) => {
      set(state => ({
        filter: { ...state.filter, ...filter },
      }));
    },

    setSearchQuery: (query: string) => {
      set({ searchQuery: query });
    },

    clearCompleted: () => {
      set(state => ({
        todos: state.todos.filter(todo => !todo.completed),
      }));
    },

    deleteAll: () => {
      set({ todos: [] });
    },

    importTodos: (todos: Todo[]) => {
      set({ todos });
    },

    exportTodos: () => {
      const { todos } = get();
      return JSON.stringify(todos, null, 2);
    },
  }),
  {
    name: 'todo-store',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  }
));

export default useToStore;
