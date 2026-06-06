'use client';

import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import SearchBar from '@/components/SearchBar';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            My Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stay organized and productive with your personal task manager
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:flex-shrink-0">
            {/* Mobile Toggle Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition"
              >
                {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                {sidebarOpen ? 'Close Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Sidebar Content */}
            {sidebarOpen || window.innerWidth >= 1024 ? (
              <div className="animate-slideIn">
                <Sidebar onFilterChange={() => {}} />
              </div>
            ) : null}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Form */}
            <TodoForm onClose={() => setSidebarOpen(false)} />

            {/* Todo List */}
            <TodoList />
          </div>
        </div>
      </div>
    </main>
  );
}
