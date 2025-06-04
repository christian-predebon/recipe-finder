import { AlertCircle } from "react-feather";

interface ErrorComponentProps {
  message?: string;
}

export default function ErrorComponent({
  message = "Qualcosa è andato storto",
}: Readonly<ErrorComponentProps>) {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <AlertCircle className="w-16 h-16 text-red-700" />
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-lg font-semibold text-red-600">Oops!</h3>
        <p className="text-center text-red-600">{message}</p>
      </div>
    </div>
  );
}
