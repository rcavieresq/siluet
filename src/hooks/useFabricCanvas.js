import { useEffect, useState } from 'react';
import { fabric } from 'fabric';

export const useFabricCanvas = (canvasRef) => {
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
    });

    setCanvas(fabricCanvas);

    fabricCanvas.on('selection:created', (e) => setActiveObject(e.selected[0]));
    fabricCanvas.on('selection:updated', (e) => setActiveObject(e.selected[0]));
    fabricCanvas.on('selection:cleared', () => setActiveObject(null));

    return () => {
      fabricCanvas.dispose();
    };
  }, [canvasRef]);

  return { canvas, activeObject };
};