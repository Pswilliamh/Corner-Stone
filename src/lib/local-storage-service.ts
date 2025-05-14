import type { SavedRock } from './rock-hound-types';

const COLLECTION_KEY = 'rockHoundCollection';

export const getCollectionFromStorage = (): SavedRock[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const item = window.localStorage.getItem(COLLECTION_KEY);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error('Error reading collection from localStorage:', error);
    return [];
  }
};

export const saveRockToStorage = (rock: SavedRock): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const collection = getCollectionFromStorage();
    // Add new rock to the beginning of the array
    const updatedCollection = [rock, ...collection];
    window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(updatedCollection));
  } catch (error) {
    console.error('Error saving rock to localStorage:', error);
    // Consider how to handle storage limit errors, e.g., notify user
  }
};

export const removeRockFromStorage = (rockId: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const collection = getCollectionFromStorage();
    const updatedCollection = collection.filter((r) => r.id !== rockId);
    window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(updatedCollection));
  } catch (error) {
    console.error('Error removing rock from localStorage:', error);
  }
};

export const updateRockInStorage = (updatedRock: SavedRock): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const collection = getCollectionFromStorage();
    const rockIndex = collection.findIndex(r => r.id === updatedRock.id);
    if (rockIndex > -1) {
      collection[rockIndex] = updatedRock;
      window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
    }
  } catch (error) {
    console.error('Error updating rock in localStorage:', error);
  }
};
