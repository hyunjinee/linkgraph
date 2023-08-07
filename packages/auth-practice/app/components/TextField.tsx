function Label({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="mb-2 font-semibold text-gray-900">
      {children}
    </label>
  );
}

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: string;
  className?: string;
}

export default function TextField({ id, label, type = 'text', className, ...props }: TextFieldProps) {
  return (
    <div>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
}

const formClasses =
  'block w-full appearance-none rounded-lg border bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-stone-500 focus:outline-none focus:ring-cyan-500 sm:text-sm';
