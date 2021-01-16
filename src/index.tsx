import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import type { RegData } from './types/reg';
import { App } from './App';
import { WorkerClient } from './worker-client';

const regData = (window as any)['__reg__'] as RegData;

// x-img-diff
const workerClient = new WorkerClient();
const ximgdiffConfig = regData.ximgdiffConfig || { enabled: false };

workerClient.start(ximgdiffConfig);

// Report App
const HotApp = hot(module)(App);

render(
  <HotApp data={regData} worker={workerClient} />,
  document.getElementById('app'),
);
