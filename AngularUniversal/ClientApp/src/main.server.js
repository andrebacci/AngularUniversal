"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("./polyfills.server");
var app_server_module_1 = require("./app/app.server.module");
var core_1 = require("@angular/core");
// import { APP_BASE_HREF } from '@angular/common';
var aspnet_prerendering_1 = require("aspnet-prerendering");
var aspnetcore_engine_1 = require("@nguniversal/aspnetcore-engine");
core_1.enableProdMode();
exports.default = aspnet_prerendering_1.createServerRenderer(function (params) {
    // Platform-server provider configuration
    var setupOptions = {
        appSelector: '<app-root></app-root>',
        ngModule: app_server_module_1.AppServerModule,
        request: params,
        providers: [
        // Optional - Any other Server providers you want to pass (remember you'll have to provide them for the Browser as well)
        ]
    };
    return aspnetcore_engine_1.ngAspnetCoreEngine(setupOptions).then(function (response) {
        // Apply your transferData to response.globals
        response.globals.transferData = aspnetcore_engine_1.createTransferScript({
            someData: 'Transfer this to the client on the window.TRANSFER_CACHE {} object',
            fromDotnet: params.data.thisCameFromDotNET // example of data coming from dotnet, in HomeController
        });
        return ({
            html: response.html,
            globals: response.globals
        });
    });
});
//# sourceMappingURL=main.server.js.map