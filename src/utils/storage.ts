/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateStorage, createJSONStorage } from 'zustand/middleware';

export const storage: StateStorage = __ISPROD_
    ? {
        getItem: (name: string) =>
            new Promise((resolve) => {
                chrome.storage.local.get(name, ({ [ name ]: value }) => resolve(value));
            }),
        setItem: (name: string, value: any) =>
            new Promise((resolve) => {
                chrome.storage.local.set({ [ name ]: value }, () => resolve(undefined));
            }),
        removeItem: (name: string) =>
            new Promise((resolve) => {
                chrome.storage.local.remove(name, () => resolve(undefined));
            }),
    }
    : localStorage;

const storageZustand = <T>() => createJSONStorage<T>(() => storage);
export default storageZustand;
