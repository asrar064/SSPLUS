import { useCallback } from "react";

// Type definition for useLocalStorage
type UseLocalStorage = {
  getFromLs: (key: string) => any;
  setInLs: (key: string, value: any) => void;
  deleteFromLs: (key: string) => void;
  clearLs: () => void;
};

// useLocalStorage Hook
export function useLocalStorage(): UseLocalStorage {
  // Get value from localStorage
  const getFromLs = useCallback((key: string) => {
    if (typeof window === "undefined") return null; // Guard for SSR
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error(`Error getting key "${key}" from localStorage:`, error);
      return null;
    }
  }, []);

  // Set value in localStorage
  const setInLs = useCallback((key: string, value: any) => {
    if (typeof window === "undefined") return; // Guard for SSR
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting key "${key}" to localStorage:`, error);
    }
  }, []);

  // Delete specific item from localStorage
  const deleteFromLs = useCallback((key: string) => {
    if (typeof window === "undefined") return; // Guard for SSR
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key "${key}" from localStorage:`, error);
    }
  }, []);

  // Clear all data from localStorage
  const clearLs = useCallback(() => {
    if (typeof window === "undefined") return; // Guard for SSR
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }, []);

  return { getFromLs, setInLs, deleteFromLs, clearLs };
}
