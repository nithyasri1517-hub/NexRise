import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  className
}: SelectFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none font-body text-sm cursor-pointer"
        >
          <option value="" disabled className="text-muted-foreground">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
};

export default SelectField;
