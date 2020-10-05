import 'zone.js/dist/zone-node';
import './polyfills.server';

import { AppServerModule } from './app/app.server.module';
import { enableProdMode } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
// import { APP_BASE_HREF } from '@angular/common';
import { createServerRenderer, RenderResult, BootFuncParams } from 'aspnet-prerendering';


import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from '@nguniversal/aspnetcore-engine';

enableProdMode();

export default createServerRenderer((params: BootFuncParams) => {

  // Platform-server provider configuration
  const setupOptions: IEngineOptions = {
    appSelector: '<app-root></app-root>',
    ngModule: AppServerModule,
    request: params,
    providers: [
      // Optional - Any other Server providers you want to pass (remember you'll have to provide them for the Browser as well)
    ]
  };

  return ngAspnetCoreEngine(setupOptions).then(response => {
    // Apply your transferData to response.globals
    response.globals.transferData = createTransferScript({
      someData: 'Transfer this to the client on the window.TRANSFER_CACHE {} object',
      fromDotnet: params.data.thisCameFromDotNET // example of data coming from dotnet, in HomeController
    });

    return ({
      html: response.html,
      globals: response.globals
    });
  });
});
