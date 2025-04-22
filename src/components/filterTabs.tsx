import { motion } from "framer-motion";

interface FilterTabsProps {
  options: { label: string; value: string }[];
  onFilterChange: (value: string) => void;
}
interface FilterTabsProps {
  options: { label: string; value: string }[];
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

export default function FilterTabs({ options, selectedFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="relative w-full">
  <div className="flex space-x-4 px-4 py-2">
    {options.map((option) => (
      <button
        key={option.value}
        className={`relative px-4 py-2 hover:cursor-pointer hover:bg-yellow-200 hover:rounded-full text-lg whitespace-nowrap font-medium transition-colors duration-300 ${
          selectedFilter === option.value ? "text-yellow-800 bg-yellow-500/80 rounded-full" : "text-gray-600"
        }`}
        onClick={() => onFilterChange(option.value)}
      >
        {option.label}
        {selectedFilter === option.value && (
          <motion.div
            layoutId="underline"
            className="absolute left-0 bottom-0 w-full h-[3px] bg-yellow"
          />
        )}
      </button>
    ))}
  </div>
</div>
  );
}
