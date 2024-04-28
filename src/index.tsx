import { createStore } from 'jotai';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { MainAppId } from './constants';
import './global.css';
import type { RegData } from './types/reg';
import { WorkerClient } from './worker-client';
import { initializeEntityState } from './states/entity';
import { initializeWorkerState } from './states/worker';

const regData = (window as any)['__reg__'] as RegData;

// x-img-diff
const workerClient = new WorkerClient();
const ximgdiffConfig = regData.ximgdiffConfig || { enabled: false };

workerClient.start(ximgdiffConfig);

// Store
const store = createStore();
initializeWorkerState(store, workerClient);
initializeEntityState(store, regData, workerClient);

// Report App
const app = document.getElementById(MainAppId);
const root = createRoot(app!);
root.render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
);
