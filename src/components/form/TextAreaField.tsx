import { cn } from '@/lib/utils';

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  hint,
  required = false,
  rows = 4,
  className
}: TextAreaFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none font-body text-sm"
      />
      {hint && (
        <p className="text-xs text-muted-foreground whitespace-pre-line">{hint}</p>
      )}
    </div>
  );
};

export default TextAreaField;
