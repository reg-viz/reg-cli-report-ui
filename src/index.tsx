import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import type { RegData } from './types/reg';
import { App } from './App';
import { WorkerClient } from './worker-client';
import { fetchData } from './utils/fetchData';

// Report App
const HotApp = hot(module)(App);

async function bootstrap() {
  const regData = (window as any)['__reg__'] as RegData;
  const jsonUrlParam = new URL(location.href).searchParams.get('reg-json-uri');
  if (jsonUrlParam) {
    return await fetchData(decodeURIComponent(jsonUrlParam));
  } else {
    return regData;
  }
}

bootstrap().then((regData) => {
  // x-img-diff
  const workerClient = new WorkerClient();
  const ximgdiffConfig = regData.ximgdiffConfig || { enabled: false };

  workerClient.start(ximgdiffConfig);
  render(
    <HotApp data={regData} worker={workerClient} />,
    document.getElementById('app'),
  );
});
