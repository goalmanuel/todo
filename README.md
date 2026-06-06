# Todo App - Feature-Rich Task Manager

## Overview

A modern, responsive todo list application built with Next.js 14, React 18, and TypeScript. All data is stored locally using browser localStorage, ensuring complete privacy and offline functionality.

## ✨ Features

### Core Features
- ✅ **Create, Read, Update, Delete (CRUD)** - Full task management
- 💾 **Local Storage** - All data persists in your browser
- 🔍 **Search** - Find tasks quickly
- 🏷️ **Categories** - Organize tasks by category
- 🎯 **Priority Levels** - Low, Medium, High priority tasks
- 📅 **Due Dates** - Set deadlines for your tasks
- ✔️ **Task Completion** - Mark tasks as done
- 📝 **Descriptions** - Add detailed descriptions to tasks
- 🌙 **Dark Mode** - Built-in dark mode support

### Advanced Features
- **Smart Filtering**
  - Filter by status (All, Active, Completed)
  - Filter by priority level
  - Filter by category
  - Sort by date, priority, or alphabetical order

- **Task Statistics**
  - Total tasks count
  - Completed tasks count
  - Active tasks count
  - Overdue tasks count

- **Data Management**
  - Export tasks as JSON
  - Import tasks from JSON file
  - Clear all completed tasks
  - Delete all tasks

- **Smart Grouping**
  - Tasks automatically grouped by: Today, Tomorrow, This Week, Later
  - Completed tasks grouped separately

- **Responsive Design**
  - Mobile-first approach
  - Works seamlessly on all screen sizes
  - Touch-friendly interface

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **State Management**: Zustand with localStorage persistence
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Date Handling**: date-fns
- **Utilities**: UUID for unique IDs

### Testing
- Jest (ready for unit tests)
- React Testing Library (ready for component tests)

## Project Structure

```
root/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   ├── TodoForm.tsx         # New task form
│   │   ├── TodoItem.tsx         # Individual task component
│   │   ├── TodoList.tsx         # Task list with grouping
│   │   ├── Sidebar.tsx          # Filters and actions
│   │   └── SearchBar.tsx        # Search component
│   ├── store/
│   │   └── todoStore.ts         # Zustand store with localStorage
│   └── types/
│       └── todo.ts              # TypeScript interfaces
├── public/                       # Static files
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── next.config.js              # Next.js config
└── README.md                   # This file
```

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone or navigate to the project**
   ```bash
   cd todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Start adding tasks!

## Usage Guide

### Adding a Task
1. Click the input field at the top
2. Enter your task title
3. (Optional) Expand for more options:
   - Add description
   - Set priority
   - Set due date
   - Assign category
4. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the checkbox
- **Edit**: Click the edit icon
- **Delete**: Click the delete icon
- **Search**: Use the search bar to find tasks

### Filtering & Sorting
- Use the sidebar to:
  - Filter by status (All, Active, Completed)
  - Sort by date, priority, or alphabetically
  - Filter by category or priority

### Data Management
- **Export**: Download all tasks as JSON backup
- **Import**: Upload a previously exported JSON file
- **Clear**: Remove all completed tasks
- **Delete All**: Remove all tasks (with confirmation)

## Local Storage

### How It Works
- All data is automatically saved to browser's localStorage
- Data persists between browser sessions
- No server or internet required
- Completely private - no data sent anywhere

### Storage Format
- Store key: `todo-store`
- Format: JSON
- Automatic saving: Changes saved immediately

### Privacy
- 100% client-side storage
- No external servers
- No tracking or analytics
- Your data is yours alone

## Browser Compatibility

| Browser | Support |
|---------|----------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| Opera   | ✅ Full |

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests
npm test

# Watch tests
npm run test:watch
```

### Type Safety
- Full TypeScript support
- Type-safe Zustand store
- Interfaces for all data types
- No `any` types used

## Performance

- ⚡ **Optimized**: Built on Next.js with automatic code splitting
- 📦 **Lightweight**: Minimal dependencies
- 🚀 **Fast**: Instant local storage operations
- 📱 **Mobile**: Optimized for mobile devices

## Styling

### Color Scheme (Light Mode)
- Primary: Indigo (#4F46E5)
- Secondary: Cyan (#06B6D4)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Warning: Amber (#F59E0B)

### Color Scheme (Dark Mode)
- Automatically adapts to system preference
- Toggle available in user preferences
- Smooth transitions between themes

## Future Enhancements

- [ ] Cloud sync with authentication
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Collaborative tasks
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Voice input
- [ ] AI-powered task suggestions
- [ ] Calendar view
- [ ] Kanban board view
- [ ] Analytics dashboard
- [ ] Keyboard shortcuts

## Keyboard Shortcuts (Planned)

- `Ctrl+N` - New task
- `Ctrl+F` - Search
- `Ctrl+E` - Export
- `Escape` - Close modals

## Troubleshooting

### Tasks not saving?
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading
- Check browser console for errors

### Data disappeared?
- Check if you accidentally cleared browser data
- Try importing from a backup JSON file
- Check localStorage quota limits

### Performance issues?
- Consider clearing very old completed tasks
- Try exporting data as backup before clearing all
- Check browser console for warnings

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial use

## Support

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Open an issue on GitHub
3. Review the documentation

## Changelog

### v1.0.0
- Initial release
- Core CRUD functionality
- Local storage persistence
- Filtering and sorting
- Import/Export functionality
- Dark mode support
- Responsive design

## Credits

Built with ❤️ using Next.js, React, and Tailwind CSS
