export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date | string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  sortBy: 'date' | 'priority' | 'alphabetical';
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}
