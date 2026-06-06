'use client';

import { useMemo } from 'react';
import useToStore from '@/store/todoStore';
import TodoItem from './TodoItem';

export default function TodoList() {
  const filteredTodos = useToStore(state => state.getFilteredTodos());

  const todosByDate = useMemo(() => {
    const groups: { [key: string]: typeof filteredTodos } = {
      'Today': [],
      'Tomorrow': [],
      'This Week': [],
      'Later': [],
      'Completed': [],
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    filteredTodos.forEach(todo => {
      if (todo.completed) {
        groups['Completed'].push(todo);
      } else if (!todo.dueDate) {
        groups['Today'].push(todo);
      } else {
        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        if (dueDate.getTime() === today.getTime()) {
          groups['Today'].push(todo);
        } else if (dueDate.getTime() === tomorrow.getTime()) {
          groups['Tomorrow'].push(todo);
        } else if (dueDate < weekEnd) {
          groups['This Week'].push(todo);
        } else {
          groups['Later'].push(todo);
        }
      }
    });

    return groups;
  }, [filteredTodos]);

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No tasks found. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(todosByDate).map(
        ([group, todos]) =>
          todos.length > 0 && (
            <div key={group}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {group} ({todos.length})
              </h3>
              <div className="space-y-2">
                {todos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}
