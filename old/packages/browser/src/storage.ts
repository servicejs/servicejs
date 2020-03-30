/**
 * Persist to session & local storage
 */

import { JsonCoder } from "@service/core";

export const persistToStorage = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      return false;
    }
  }
  return true;
};

export const restoreFromStorage = (key: string): string | null | void => {
  try {
    return sessionStorage.getItem(key);
  } catch (e) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      // Intentionally blank
    }
  }
};

export const persistObjectToStorage = (key: string, value: any) => {
  const jsonCoder = new JsonCoder();
  const encodedValue = jsonCoder.encode(value);
  return persistToStorage(key, encodedValue);
};

export const restoreObjectFromStorage = (key: string) => {
  const storedValue = restoreFromStorage(key);
  if (typeof storedValue === "undefined" || storedValue === null) {
    return;
  }
  const jsonCoder = new JsonCoder();
  return jsonCoder.decode(storedValue);
};
