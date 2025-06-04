type ButtonVariant = "outlined" | "contained";

interface ButtonProps {
  onClick: () => void;
  title?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
}

function Button({
  title,
  onClick,
  icon,
  variant = "outlined",
}: Readonly<ButtonProps>) {
  const baseClassName =
    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 cursor-pointer";

  const variantStyles = {
    outlined:
      "text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:ring-gray-200 border border-gray-200",
    contained:
      "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-300 border border-gray-800",
  };

  return (
    <button
      className={`${baseClassName} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  );
}

export default Button;
