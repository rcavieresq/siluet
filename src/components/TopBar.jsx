import { Save, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveProject } from '../services/db';

export default function TopBar({ canvas, projectName }) {
  const handleExport = async () => {
    const node = document.getElementById('canvas-container');
    if (!node) return;
    try {
      const dataUrl = await toPng(node);
      const link = document.createElement('a');
      link.download = `${projectName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exportando:', err);
    }
  };

  const handleSave = async () => {
    if (!canvas) return;
    await saveProject('default-project', projectName, canvas.toJSON());
    alert('Proyecto guardado en tu navegador');
  };

  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-4">
      <input 
        type="text" 
        defaultValue={projectName} 
        className="font-bold text-lg outline-none border-b-2 border-transparent focus:border-blue-500 bg-transparent"
      />
      <div className="flex gap-2">
        <button onClick={handleSave} className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium">
          <Save size={16} /> Guardar (Local)
        </button>
        <button onClick={handleExport} className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium">
          <Download size={16} /> Exportar PNG
        </button>
      </div>
    </div>
  );
}