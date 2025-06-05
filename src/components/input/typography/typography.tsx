type TypographyVariant = "subtitle" | "body";

interface TypographyProps {
  children: React.ReactNode;
  variant: TypographyVariant;
  className?: string;
}

function Typography({ children, variant, className }: TypographyProps) {
  const baseStyles = {
    subtitle: "text-2xl",
    body: "text-sm text-gray-600 mt-2",
  };

  return <p className={`${baseStyles[variant]} ${className}`}>{children}</p>;
}

export default Typography;
