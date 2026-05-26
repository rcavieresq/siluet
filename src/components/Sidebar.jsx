import { Type, Square, Circle, Image as ImageIcon } from 'lucide-react';
import { fabric } from 'fabric';

export default function Sidebar({ canvas, saveState }) {
  
  const addText = () => {
    const text = new fabric.IText('Doble clic para editar', {
      left: 100, top: 100, fontFamily: 'Arial', fill: '#333', fontSize: 24
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    saveState();
  };

  const addShape = (type) => {
    let shape;
    if (type === 'rect') {
      shape = new fabric.Rect({ left: 100, top: 100, fill: '#cccccc', width: 100, height: 100 });
    } else {
      shape = new fabric.Circle({ left: 100, top: 100, fill: '#cccccc', radius: 50 });
    }
    canvas.add(shape);
    canvas.setActiveObject(shape);
    saveState();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target.result;
      fabric.Image.fromURL(data, (img) => {
        img.scaleToWidth(200);
        canvas.add(img);
        canvas.setActiveObject(img);
        saveState();
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col p-4 gap-4 overflow-y-auto">
      <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Herramientas</h3>
      
      <button onClick={addText} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded text-left text-sm font-medium text-gray-700 transition-colors">
        <Type size={18} /> Añadir Texto
      </button>
      
      <button onClick={() => addShape('rect')} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded text-left text-sm font-medium text-gray-700 transition-colors">
        <Square size={18} /> Añadir Rectángulo
      </button>
      
      <button onClick={() => addShape('circle')} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded text-left text-sm font-medium text-gray-700 transition-colors">
        <Circle size={18} /> Añadir Círculo
      </button>

      <div className="mt-4 border-t pt-4">
        <label className="flex items-center justify-center gap-2 p-3 bg-purple-100 text-purple-700 rounded cursor-pointer hover:bg-purple-200 text-sm font-medium transition-colors">
          <ImageIcon size={18} /> Subir Imagen
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
    </div>
  );
}