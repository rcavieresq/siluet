import { Search, FolderPlus, Plus } from 'lucide-react';

export default function AssetsPanel() {
  return (
    <div className="w-[320px] bg-white border-r border-gray-200 h-full flex flex-col shadow-[4px_0_12px_rgba(0,0,0,0.03)] z-10">
      {/* Pestañas */}
      <div className="flex border-b border-gray-200 mt-2">
        <button className="flex-1 pb-3 text-sm text-gray-500 font-medium">Stock</button>
        <button className="flex-1 pb-3 text-sm text-indigo-600 font-medium border-b-2 border-indigo-600">Mis activos</button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full">
        {/* Buscador */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Busca imagen" 
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-semibold text-gray-700">Imagen Activos</span>
          <div className="flex gap-2">
            <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50">
              <FolderPlus size={16} className="text-gray-600" />
            </button>
            <button className="p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Cuadrícula de imágenes (Placeholder visual) */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {/* Aquí mapearás tus imágenes reales después */}
          <div className="aspect-[3/4] bg-gray-200 rounded-lg border border-gray-100 object-cover overflow-hidden"></div>
          <div className="aspect-[3/4] bg-gray-300 rounded-lg border border-gray-100 object-cover overflow-hidden"></div>
          <div className="aspect-[3/4] bg-gray-300 rounded-lg border border-gray-100 object-cover overflow-hidden"></div>
          <div className="aspect-[3/4] bg-gray-200 rounded-lg border border-gray-100 object-cover overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
}
