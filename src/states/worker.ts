import { atom, useAtomValue } from 'jotai';
import type { Store } from '../types/store';
import type { WorkerClient } from '../worker-client';

const workerAtom = atom<WorkerClient | null>(null);

export const initializeWorkerState = (store: Store, worker: WorkerClient) => {
  store.set(workerAtom, worker);
};

export const useWorkerClient = () => {
  const worker = useAtomValue(workerAtom);
  if (worker == null) {
    throw new Error('WorkerClient is not initialized');
  }
  return worker;
};
