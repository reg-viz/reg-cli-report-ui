import './global.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { RegData } from './types/reg';
import { App } from './App';
import { WorkerClient } from './worker-client';
import { MainAppId } from './constants';

const regData = (window as any)['__reg__'] as RegData;

// x-img-diff
const workerClient = new WorkerClient();
const ximgdiffConfig = regData.ximgdiffConfig || { enabled: false };

workerClient.start(ximgdiffConfig);

// Report App
const app = document.getElementById(MainAppId);
const root = createRoot(app!);
root.render(<App data={regData} worker={workerClient} />);
