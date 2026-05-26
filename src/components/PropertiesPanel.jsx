import { Trash2 } from 'lucide-react';

export default function PropertiesPanel({ canvas, activeObject, saveState }) {
  if (!activeObject) {
    return (
      <div className="w-64 bg-white border-l h-full p-4 flex items-center justify-center text-center">
        <span className="text-gray-400 text-sm">Selecciona un elemento en el lienzo para editar sus propiedades.</span>
      </div>
    );
  }

  const handleDelete = () => {
    canvas.remove(activeObject);
    canvas.discardActiveObject();
    saveState();
  };

  const changeColor = (e) => {
    if (activeObject.type === 'i-text') {
      activeObject.set('fill', e.target.value);
    } else {
      activeObject.set('fill', e.target.value);
    }
    canvas.renderAll();
    saveState();
  };

  return (
    <div className="w-64 bg-white border-l h-full flex flex-col p-4 gap-6 overflow-y-auto">
      <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Propiedades</h3>
      
      {activeObject.type !== 'image' && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Color</label>
          <input 
            type="color" 
            defaultValue={activeObject.fill || '#000000'}
            onChange={changeColor} 
            className="w-full h-10 cursor-pointer rounded border border-gray-300" 
          />
        </div>
      )}

      <div className="mt-auto pt-4 border-t">
        <button onClick={handleDelete} className="flex items-center justify-center gap-2 w-full p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium transition-colors">
          <Trash2 size={16} /> Eliminar Elemento
        </button>
      </div>
    </div>
  );
}