interface ArrowButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

function ArrowButton({
  onClick,
  children,
  disabled,
}: Readonly<ArrowButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ArrowButton;
