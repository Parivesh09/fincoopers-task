# Project Management Dashboard

A modern, responsive project management dashboard built with **Next.js 14**, **TypeScript**, **Tailwind CSS v4**, and **Redux Toolkit**. Features a comprehensive theme system with light/dark mode support, smooth animations, and a beautiful UI.

---

## 🚀 Features

- **🎨 Advanced Theme System** - Light/dark mode with CSS variables
- **📱 Responsive Design** - Works on all devices
- **⚡ Performance Optimized** - Built with Next.js 14 and Tailwind CSS v4
- **🔧 TypeScript** - Full type safety
- **📊 Interactive Charts** - Recharts integration
- **🎯 Redux State Management** - Centralized state with Redux Toolkit
- **♿ Accessibility** - WCAG compliant design
- **🔄 Smooth Animations** - CSS transitions and keyframes

---

## 📸 Screenshots

### 🏠 Dashboard Overview
![Dashboard Overview](/screenshots/dashboard-overview.png)
*Main dashboard with project statistics, charts, and key metrics*

### 🌙 Dark Mode Interface
![Dark Mode](/screenshots/dark-mode.png)
*Complete dark theme with all components and navigation*

### 📱 Mobile Responsive Design
![Mobile View](/public/screenshots/responsive-dashboard.png)
![](/public/screenshots/responsive-project.png)
*Fully responsive design optimized for mobile devices*

### 📋 Projects Management
![Projects Page](/public/screenshots/project-light.png)
![](/public/screenshots/project-dark.png)
*Project listing with filtering, sorting, and management features*

### 📊 Project Details & Tasks
![Project Details](/public/screenshots/projectDetails-light.png)
![](/public/screenshots/projectDetails-dark.png)
*Detailed project view with task management and progress tracking*

### 👥 Team Management
![Teams Page](/public/screenshots/teams-light.png)
![](/public/screenshots/teams-dark.png)
*Team overview with member management and collaboration features*

### ⚙️ Settings & Configuration
![Settings Page](/public/screenshots/settings-light.png)
![](/public/screenshots/settings-dark.png)
*Application settings and user preferences*

### 🔐 Authentication
![Login Page](/public/screenshots/loginpage.png)
*Secure login interface with modern design*

### 📈 Analytics & Reports
![Analytics Dashboard](/public/screenshots/dashboard-light.png)
![](/public/screenshots/dashboard-dark.png)
*Advanced analytics with interactive charts and data visualization*

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Custom built with theme system

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Parivesh09/fincoopers-task
cd fincoopers-task
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for production
```bash
npm run build
npm start
```

### 5. Environment Variables(optional if you are connecting to backend)
Create a `.env.local` file for environment-specific configurations:
```env
NEXT_PUBLIC_API_URL=your-api-url
```

---

## 📁 Project Structure & Code Explanation

```
project-management-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes (e.g., login)
│   │   ├── dashboard/         # Dashboard routes (main app UI)
│   │   ├── globals.css        # Global styles and theme system
│   │   └── layout.tsx         # Root layout (wraps all pages)
│   ├── components/            # React components
│   │   ├── layout/           # Layout components (Sidebar, Topbar)
│   │   ├── providers/        # Context providers (Redux, Theme)
│   │   ├── ui/               # UI components (Card, Modal, etc.)
│   │   └── projects/         # Project-specific components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and configurations
│   │   ├── store.ts          # Redux store
│   │   ├── data.ts           # Mock data
│   │   └── theme.ts          # Theme utilities
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

### **Key Files Explained**

- **src/app/layout.tsx**: Root layout, wraps all pages, imports global CSS, and provides Redux/Theme context.
- **src/app/globals.css**: Global styles, CSS variables for theming, custom utility classes, and Tailwind import.
- **src/app/dashboard/layout.tsx**: Dashboard shell with sidebar, topbar, and main content area.
- **src/app/dashboard/page.tsx**: Main dashboard page, shows stats, charts, and cards.
- **src/components/layout/Sidebar.tsx**: Sidebar navigation with theme toggle.
- **src/components/layout/Topbar.tsx**: Top navigation bar with user info and notifications.
- **src/components/ui/Card.tsx**: Reusable card component with theme variants.
- **src/components/ui/Modal.tsx**: Modal dialog component.
- **src/components/providers/ThemeProvider.tsx**: Theme context and logic (light/dark mode, system preference, localStorage).
- **src/lib/store.ts**: Redux store setup and app state slice.
- **src/lib/theme.ts**: Theme utility functions and constants.

---

## 🎨 Theme System Deep Dive

### **How It Works**
- **CSS Variables** are defined in `globals.css` under `:root` (light) and `.dark` (dark mode).
- **Custom utility classes** (e.g., `.bg-background`, `.text-foreground`, `.border-border`) use these variables for consistent theming.
- **ThemeProvider** manages the current theme, syncs with system preference, and persists user choice in localStorage.
- **All components** use semantic classes (not hardcoded colors) for full theme support.

### **Example: Using Theme Variables in CSS**
```css
.my-element {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### **Example: Custom Utility Class**
```css
.bg-background { background-color: hsl(var(--background)) !important; }
.text-foreground { color: hsl(var(--foreground)) !important; }
.border-border { border-color: hsl(var(--border)) !important; }
```

### **Why `!important`?**
This ensures our custom utilities override any conflicting Tailwind classes.

### **Switching Themes in Code**
```tsx
import { useTheme } from '@/components/providers/ThemeProvider';

function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {isDark ? 'light' : 'dark'} mode
    </button>
  );
}
```

---

## 🧩 Component Usage Examples

### **Card Component**
```tsx
import { Card } from '@/components/ui/Card';
<Card title="Total Projects" value="12" />
<Card title="Completed Tasks" value="45" icon={<CheckCircle />} variant="success" />
```

### **Modal Component**
```tsx
import Modal from '@/components/ui/Modal';
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Project" size="lg">
  <p>Modal content goes here</p>
</Modal>
```

### **Sidebar with Theme Toggle**
```tsx
import Sidebar from '@/components/layout/Sidebar';
<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
```

### **Dashboard Page**
```tsx
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-foreground">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Projects" value={stats.totalProjects} />
      </div>
    </div>
  );
}
```

---

## 🗂️ Redux State Management

- **src/lib/store.ts** sets up the Redux store and app slice (projects, user, theme, etc.).
- Use `useAppSelector` and `useAppDispatch` hooks for typed access to state and dispatch.
- Example:
```tsx
import { useAppSelector, useAppDispatch } from '@/lib/store';
const projects = useAppSelector(state => state.app.projects);
const dispatch = useAppDispatch();
```

---

## 🧑‍💻 Extending the App

### **Adding a New Page**
1. Create a new folder in `src/app/` (e.g., `src/app/reports/`).
2. Add a `page.tsx` file for the new route.
3. Use the existing layout and theme system.

### **Adding a New Theme Color**
1. Add a new CSS variable in `:root` and `.dark` in `globals.css`.
2. Add the color to `tailwind.config.js` under `theme.extend.colors`.
3. Create a utility class in `@layer utilities` in `globals.css`.
4. Use the new class in your components.

### **Adding a New Component**
1. Create the component in `src/components/ui/` or another appropriate folder.
2. Use semantic color classes (e.g., `bg-card`, `text-foreground`).
3. Add TypeScript types and props.
4. Test in both light and dark modes.

---

## 🎨 Color Palette Reference

- **Primary**: Blue (`hsl(221.2 83.2% 53.3%)`)
- **Success**: Green (`hsl(142.1 76.2% 36.3%)`)
- **Warning**: Orange (`hsl(38 92% 50%)`)
- **Info**: Blue (`hsl(199 89% 48%)`)
- **Destructive**: Red (`hsl(0 84.2% 60.2%)`)
- **Background**: `hsl(var(--background))`
- **Foreground**: `hsl(var(--foreground))`
- **Card**: `hsl(var(--card))`
- **Border**: `hsl(var(--border))`

---

## ♿ Accessibility & Best Practices

- All color combinations meet WCAG AA contrast requirements.
- Focus indicators and keyboard navigation are supported.
- Theme system respects user motion preferences.
- Use semantic classes and variants for maintainability.

---

## 📚 Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Recharts Documentation](https://recharts.org/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in both light and dark modes
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding! 🎉**
