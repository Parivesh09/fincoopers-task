import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/types';
import { mockProjects, mockUsers } from './data';

const initialState: AppState = {
  projects: mockProjects,
  currentUser: mockUsers[0],
  theme: { mode: 'light' },
  isLoading: false,
  error: null,
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<AppState['projects']>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<AppState['projects'][0]>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<{ id: string; updates: Partial<AppState['projects'][0]> }>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload.updates };
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<AppState['currentUser']>) => {
      state.currentUser = action.payload;
    },
    toggleTheme: (state) => {
      state.theme.mode = state.theme.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme.mode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  setCurrentUser,
  toggleTheme,
  setTheme,
  setLoading,
  setError,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 
