'use client';

import { FiSearch, FiX } from 'react-icons/fi';
import useToStore from '@/store/todoStore';

export default function SearchBar() {
  const searchQuery = useToStore(state => state.searchQuery);
  const setSearchQuery = useToStore(state => state.setSearchQuery);

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FiSearch size={20} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:text-white"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
}
