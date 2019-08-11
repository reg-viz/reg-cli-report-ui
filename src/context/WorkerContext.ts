import { createContext } from 'react';
import { WorkerClient } from '../worker-client';

export type WorkerContextValue = WorkerClient | null;

export const WorkerContext = createContext<WorkerContextValue>(null);
