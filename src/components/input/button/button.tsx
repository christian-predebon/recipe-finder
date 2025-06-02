interface ButtonProps {
  onClick: () => void;
  title?: string;
  icon?: React.ReactNode;
}

function Button({ title, onClick, icon }: Readonly<ButtonProps>) {
  const baseClassName =
    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 cursor-pointer border border-gray-200 transition-all duration-200";

  return (
    <button className={baseClassName} onClick={onClick}>
      {icon}
      {title}
    </button>
  );
}

export default Button;
