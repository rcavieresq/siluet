import { useState, useRef, useCallback } from 'react';

export const useHistory = (canvas, maxHistory = 30) => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isProcessingRef = useRef(false);

  const saveState = useCallback(() => {
    if (!canvas || isProcessingRef.current) return;
    
    const json = canvas.toJSON();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(json);

    if (newHistory.length > maxHistory) {
      newHistory.shift();
    } else {
      setHistoryIndex(newHistory.length - 1);
    }
    setHistory(newHistory);
  }, [canvas, history, historyIndex, maxHistory]);

  const undo = () => {
    if (historyIndex > 0 && canvas) {
      isProcessingRef.current = true;
      const previousState = history[historyIndex - 1];
      canvas.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setHistoryIndex(historyIndex - 1);
        isProcessingRef.current = false;
      });
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1 && canvas) {
      isProcessingRef.current = true;
      const nextState = history[historyIndex + 1];
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setHistoryIndex(historyIndex + 1);
        isProcessingRef.current = false;
      });
    }
  };

  return { saveState, undo, redo, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1 };
};