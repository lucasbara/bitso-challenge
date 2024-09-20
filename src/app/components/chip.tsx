type ChipProps = {
  label: string;
};

export default function Chip({ label }: ChipProps) {
  return (
    <div className="inline-block bg-gray-800 text-xs px-3 py-1 rounded-full mt-3 mb-6">
      {label}
    </div>
  );
}
