import { Undo2, Redo2 } from 'lucide-react';

export default function BottomNav({ undo, redo, canUndo, canRedo, currentPage = 1, totalPages = 1 }) {
  return (
    <div className="h-12 bg-white border-t flex items-center justify-between px-4 z-10">
      <div className="flex gap-2">
        <button 
          onClick={undo} 
          disabled={!canUndo} 
          className={`p-2 rounded transition-colors ${canUndo ? 'hover:bg-gray-100 text-gray-800 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
          title="Deshacer (Ctrl+Z)"
        >
          <Undo2 size={18} />
        </button>
        <button 
          onClick={redo} 
          disabled={!canRedo} 
          className={`p-2 rounded transition-colors ${canRedo ? 'hover:bg-gray-100 text-gray-800 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
          title="Rehacer (Ctrl+Y)"
        >
          <Redo2 size={18} />
        </button>
      </div>
      <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        Página {currentPage} / {totalPages}
      </div>
    </div>
  );
}