'use client';

import { useState } from 'react';
import { FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import useToStore from '@/store/todoStore';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const toggleTodo = useToStore(state => state.toggleTodo);
  const deleteTodo = useToStore(state => state.deleteTodo);
  const updateTodo = useToStore(state => state.updateTodo);

  const isOverdue =
    !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date();

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 border border-gray-200 dark:border-slate-700 space-y-3">
        <input
          type="text"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white font-semibold"
        />
        <textarea
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
          placeholder="Add description..."
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white text-sm"
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="px-3 py-1 border border-gray-300 dark:border-slate-600 rounded hover:bg-gray-50 dark:hover:bg-slate-700 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-primary hover:bg-primary-dark text-white rounded transition text-sm"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow p-4 border border-gray-200 dark:border-slate-700 transition ${
        isOverdue ? 'border-red-300 dark:border-red-700' : ''
      }`}
    >
      <div className="flex gap-3 items-start">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-slate-500 hover:border-primary'
          }`}
        >
          {todo.completed && <FiCheck className="text-white" size={16} />}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-gray-900 dark:text-white break-words ${
              todo.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : ''
            }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 break-words">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-2 items-center">
            {todo.priority && (
              <span className={`text-xs font-medium px-2 py-1 rounded ${priorityColors[todo.priority]}`}>
                {todo.priority}
              </span>
            )}
            {todo.category && (
              <span className="text-xs bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                {todo.category}
              </span>
            )}
            {isOverdue && (
              <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                Overdue
              </span>
            )}
            {todo.dueDate && !isOverdue && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Due {formatDistanceToNow(new Date(todo.dueDate), { addSuffix: true })}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 hover:text-primary dark:hover:text-secondary transition"
            title="Edit"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 text-gray-500 hover:text-error transition"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
