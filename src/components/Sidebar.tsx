'use client';

import { FiFilter, FiDownload, FiUpload, FiTrash2 } from 'react-icons/fi';
import useToStore from '@/store/todoStore';

interface SidebarProps {
  onFilterChange: (filter: any) => void;
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const filter = useToStore(state => state.filter);
  const setFilter = useToStore(state => state.setFilter);
  const categories = useToStore(state => state.getCategories());
  const stats = useToStore(state => state.getStats());
  const clearCompleted = useToStore(state => state.clearCompleted);
  const deleteAll = useToStore(state => state.deleteAll);
  const exportTodos = useToStore(state => state.exportTodos);
  const importTodos = useToStore(state => state.importTodos);

  const handleStatusChange = (status: any) => {
    setFilter({ status });
  };

  const handleSortChange = (sortBy: any) => {
    setFilter({ sortBy });
  };

  const handleCategoryChange = (category: string | undefined) => {
    setFilter({ category });
  };

  const handleExport = () => {
    const data = exportTodos();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const todos = JSON.parse(event.target?.result as string);
          if (Array.isArray(todos)) {
            importTodos(todos);
            alert('Todos imported successfully!');
          }
        } catch (error) {
          alert('Error importing todos. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full lg:w-64 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-slate-700">
      {/* Stats */}
      <div className="mb-6 space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FiFilter size={18} /> Stats
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 dark:bg-slate-700 p-2 rounded text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.total}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
          </div>
          <div className="bg-green-50 dark:bg-slate-700 p-2 rounded text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.completed}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Done</p>
          </div>
          <div className="bg-yellow-50 dark:bg-slate-700 p-2 rounded text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.active}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Active</p>
          </div>
          <div className="bg-red-50 dark:bg-slate-700 p-2 rounded text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {stats.overdue}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Overdue</p>
          </div>
        </div>
      </div>

      <hr className="my-4 dark:border-slate-700" />

      {/* Filters */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
            Status
          </label>
          <select
            value={filter.status}
            onChange={e => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
            Sort By
          </label>
          <select
            value={filter.sortBy}
            onChange={e => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
          >
            <option value="date">Date Created</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {categories.length > 0 && (
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
              Category
            </label>
            <select
              value={filter.category || ''}
              onChange={e => handleCategoryChange(e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <hr className="my-4 dark:border-slate-700" />

      {/* Actions */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
          Actions
        </label>

        <button
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-600 transition text-sm font-medium"
        >
          <FiDownload size={16} />
          Export
        </button>

        <label className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-50 dark:bg-slate-700 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-slate-600 transition text-sm font-medium cursor-pointer">
          <FiUpload size={16} />
          Import
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear all completed tasks?')) {
              clearCompleted();
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-yellow-50 dark:bg-slate-700 text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-100 dark:hover:bg-slate-600 transition text-sm font-medium"
        >
          <FiTrash2 size={16} />
          Clear Completed
        </button>

        <button
          onClick={() => {
            if (confirm('Are you sure? This will delete all tasks permanently!')) {
              deleteAll();
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 dark:bg-slate-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-slate-600 transition text-sm font-medium"
        >
          <FiTrash2 size={16} />
          Delete All
        </button>
      </div>
    </div>
  );
}
