import { openDB } from 'idb';

const DB_NAME = 'DesignEditorDB';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('assets')) {
        db.createObjectStore('assets', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveProject = async (id, name, canvasData) => {
  const db = await initDB();
  await db.put('projects', { 
    id, 
    name, 
    data: canvasData, 
    updatedAt: new Date().toISOString() 
  });
};

export const loadProject = async (id) => {
  const db = await initDB();
  return await db.get('projects', id);
};