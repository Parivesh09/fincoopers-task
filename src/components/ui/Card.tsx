import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
}

export function Card({ title, value, icon, variant = 'default' }: CardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground border-primary';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground border-secondary';
      case 'success':
        return 'bg-success text-success-foreground border-success';
      case 'warning':
        return 'bg-warning text-warning-foreground border-warning';
      case 'destructive':
        return 'bg-destructive text-destructive-foreground border-destructive';
      default:
        return 'bg-card text-card-foreground border-border';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary-foreground';
      case 'secondary':
        return 'text-secondary-foreground';
      case 'success':
        return 'text-success-foreground';
      case 'warning':
        return 'text-warning-foreground';
      case 'destructive':
        return 'text-destructive-foreground';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className={`p-6 rounded-lg border shadow-sm transition-all duration-200 hover:shadow-md ${getVariantClasses()}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-80">{title}</h3>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className={`p-3 rounded-lg bg-background/10 ${getIconColor()}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
} 
