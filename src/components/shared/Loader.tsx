import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loader = ({ className, size = 'md', text }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative">
        <div 
          className={cn(
            "rounded-full border-4 border-secondary",
            sizeClasses[size]
          )}
        />
        <div 
          className={cn(
            "absolute top-0 left-0 rounded-full border-4 border-primary border-t-transparent animate-spin",
            sizeClasses[size]
          )}
        />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default Loader;
