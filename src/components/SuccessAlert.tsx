export default function SuccessAlert({ message }: { message: string }) {
  return (
    <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded w-80 text-center">
      {message}
    </div>
  );
}