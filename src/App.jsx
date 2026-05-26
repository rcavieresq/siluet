import { useRef, useEffect } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import PropertiesPanel from './components/PropertiesPanel';
import BottomNav from './components/BottomNav';
import { useFabricCanvas } from './hooks/useFabricCanvas';
import { useHistory } from './hooks/useHistory';
import { loadProject } from './services/db';

export default function App() {
  const canvasRef = useRef(null);
  const { canvas, activeObject } = useFabricCanvas(canvasRef);
  const { saveState, undo, redo, canUndo, canRedo } = useHistory(canvas);

  useEffect(() => {
    if (!canvas) return;
    
    saveState();

    const handleModification = () => saveState();
    
    canvas.on('object:modified', handleModification);

    // Atajos de teclado para Undo/Redo
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) redo();
        else undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      canvas.off('object:modified', handleModification);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas, saveState, undo, redo]);

  useEffect(() => {
    const initLoad = async () => {
      if (!canvas) return;
      const project = await loadProject('default-project');
      if (project && project.data) {
        canvas.loadFromJSON(project.data, () => {
          canvas.renderAll();
          saveState(); 
        });
      }
    };
    initLoad();
  }, [canvas, saveState]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100 font-sans">
      <TopBar canvas={canvas} projectName="Mi Diseño Local" />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar canvas={canvas} saveState={saveState} />
        
        <main className="flex-1 overflow-auto flex items-center justify-center p-8 bg-gray-200">
          <div 
            id="canvas-container" 
            className="shadow-md bg-white transition-all"
            style={{ width: '800px', height: '600px' }}
          >
            <canvas ref={canvasRef} />
          </div>
        </main>
        
        <PropertiesPanel canvas={canvas} activeObject={activeObject} saveState={saveState} />
      </div>

      <BottomNav undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
    </div>
  );
}