import { Item } from "./page";

const RenderItem = ({ index, item }: { index: number; item: Item }) => {
  return (
    <div
      className={`flex h-full items-center border-b border-gray-100 px-6 transition-all duration-200 last:border-0 hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5 ${
        index % 2 === 0 ? "bg-gray-50/50 dark:bg-white/5" : ""
      }`}
    >
      <div className="mr-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-gray-200 dark:bg-zinc-800">
        <span className="text-[10px] font-bold text-gray-500">#{index}</span>
      </div>
      <div className="flex flex-col overflow-hidden text-left">
        <span className="truncate text-sm font-medium">{item.name}</span>
        <span className="text-[10px] tracking-wider text-gray-400 uppercase">Virtualized</span>
      </div>

      <div className="ml-auto flex space-x-1">
        <div className="h-4 w-1 rounded-full bg-blue-500/40" />
      </div>
    </div>
  );
};

export default RenderItem;
