import { LayoutGrid, Image as ImageIcon, Type, Shapes, Clock, Video, Grid } from 'lucide-react';

export default function LeftNav() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 h-full flex flex-col items-center py-4 z-20">
      <div className="flex flex-col gap-4 w-full px-2">
        <button className="p-2 w-full flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 rounded-lg">
          <LayoutGrid size={20} />
        </button>
        {/* Ícono activo (Morado) */}
        <button className="p-2 w-full flex flex-col items-center gap-1 bg-indigo-50 text-indigo-600 rounded-xl relative">
          <ImageIcon size={22} />
          <span className="text-[10px] font-medium mt-1">Activos</span>
          <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-600 rounded-r-md"></div>
        </button>
        <button className="p-2 w-full flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 rounded-lg">
          <Type size={20} />
        </button>
        <button className="p-2 w-full flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 rounded-lg">
          <Shapes size={20} />
        </button>
        <button className="p-2 w-full flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 rounded-lg">
          <Clock size={20} />
        </button>
        <button className="p-2 w-full flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 rounded-lg">
          <Grid size={20} />
        </button>
      </div>
    </div>
  );
}
