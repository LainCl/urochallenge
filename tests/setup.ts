import '@testing-library/jest-dom';

// Ensure a clean in-memory Storage implementation if Node 26 --localstorage-file is not set
const memoryStore = new Map<string, string>();
const storageMock: Storage = {
  get length() {
    return memoryStore.size;
  },
  clear() {
    memoryStore.clear();
  },
  getItem(key: string) {
    return memoryStore.has(key) ? memoryStore.get(key)! : null;
  },
  key(index: number) {
    return Array.from(memoryStore.keys())[index] ?? null;
  },
  removeItem(key: string) {
    memoryStore.delete(key);
  },
  setItem(key: string, value: string) {
    memoryStore.set(key, String(value));
  },
};

Object.defineProperty(globalThis, 'localStorage', {
  value: storageMock,
  writable: true,
  configurable: true,
});
