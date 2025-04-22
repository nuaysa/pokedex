import { typeColors } from "@/helpers/color";

interface FilterTabsProps {
  options: { label: string; value: string }[];
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

export default function FilterTabs({ options, selectedFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4 px-4 py-2 whitespace-nowrap">
        {options.map((option) => {
          return (
            <button
            key={option.value}
            className={`relative px-4 py-2 h-10 flex items-center justify-center rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
              selectedFilter === option.value
                ? "text-black"
                : "text-gray-700"
            }`}
            style={{
              backgroundColor: selectedFilter === option.value
                ? typeColors[option.value] || "#facc15" // fallback ke kuning kalau bukan type
                : "transparent",
            }}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </button>
          
          );
        })}
      </div>
    </div>
  );
}
