interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: number;
  unit?: string;
  placeholder?: string;
  helpText?: string;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  step = 0.25,
  unit,
  placeholder,
  helpText,
}: NumberFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 shadow-sm outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
        />
        {unit && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            {unit}
          </span>
        )}
      </div>
      {helpText && <p className="text-xs text-slate-500">{helpText}</p>}
    </div>
  );
}
