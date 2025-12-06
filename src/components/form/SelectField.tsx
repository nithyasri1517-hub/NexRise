import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement> | { target: { name: string; value: string } }) => void;
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
  const hasOtherOption = options.includes("Other");
  const isOtherSelected = hasOtherOption && value && !options.slice(0, -1).includes(value) && value !== "Other";
  const [showOtherInput, setShowOtherInput] = useState(isOtherSelected);
  const [otherValue, setOtherValue] = useState(isOtherSelected ? value : '');

  useEffect(() => {
    if (isOtherSelected) {
      setShowOtherInput(true);
      setOtherValue(value);
    }
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    
    if (selectedValue === "Other") {
      setShowOtherInput(true);
      setOtherValue('');
    } else {
      setShowOtherInput(false);
      setOtherValue('');
      onChange(e);
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setOtherValue(newValue);
    onChange({ target: { name, value: newValue } });
  };

  const displayValue = showOtherInput ? "Other" : (options.includes(value) ? value : "");

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
          value={displayValue}
          onChange={handleSelectChange}
          required={required && !showOtherInput}
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
      
      {showOtherInput && (
        <Input
          type="text"
          value={otherValue}
          onChange={handleOtherInputChange}
          placeholder={`Please specify your ${label.toLowerCase()}...`}
          required={required}
          className="mt-2"
        />
      )}
    </div>
  );
};

export default SelectField;