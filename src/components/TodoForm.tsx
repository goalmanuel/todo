'use client';

import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import useToStore from '@/store/todoStore';

interface TodoFormProps {
  onClose?: () => void;
}

export default function TodoForm({ onClose }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const addTodo = useToStore(state => state.addTodo);
  const categories = useToStore(state => state.getCategories());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    addTodo({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      category: category.trim(),
      priority,
      completed: false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategory('');
    setPriority('medium');
    setIsExpanded(false);

    onClose?.();
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategory('');
    setPriority('medium');
    setIsExpanded(false);
    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 border border-gray-200 dark:border-slate-700"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add a new task..."
          onClick={() => setIsExpanded(true)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <FiPlus size={20} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Add description (optional)..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <div className="flex gap-2">
              {categories.length > 0 && (
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Select or create...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
              {categories.length === 0 && (
                <input
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  placeholder="Enter category..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
                />
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
