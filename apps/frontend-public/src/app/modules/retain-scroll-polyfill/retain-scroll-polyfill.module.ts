
// https://www.bennadel.com/blog/3534-restoring-and-resetting-the-scroll-position-using-the-navigationstart-event-in-angular-7-0-4.htm
// Import the core angular services.
import { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { DomUtils } from "./dom-utils";
import { Options as ServiceOptions } from "./retain-scroll-polyfill.service";
import { OPTIONS_TOKEN as ServiceOptionsToken } from "./retain-scroll-polyfill.service";
import { RetainScrollPolyfillService } from "./retain-scroll-polyfill.service";
import { RouterOutletDirective } from "./router-outlet.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface ModuleOptions {
	pollDuration?: number;
	pollCadence?: number;
}

@NgModule({
	exports: [
		RouterOutletDirective
	],
	declarations: [
		RouterOutletDirective
	]
})
export class RetainScrollPolyfillModule {

	// I setup the module after it has been initialized.
	// --
	// NOTE: This is essentially a "run block" for the module. We need to use this run
	// block in order to ensure that the polyfill service is actually created and bound 
	// to the UI.
	constructor( polyfillService: RetainScrollPolyfillService ) {

		console.group( "Retain Scroll Polyfill Module" );
		console.warn( "This module assumes simulated encapsulation attributes for CSS selector generation." );
		console.groupEnd();

	}

	// ---
	// STATIC METHODS.
	// ---

	// I setup the module providers for the application.
	static forRoot( options: ModuleOptions = {} ) : ModuleWithProviders<RetainScrollPolyfillModule> {

		return({
			ngModule: RetainScrollPolyfillModule,
			providers: [
				DomUtils,
				RetainScrollPolyfillService,
				{
					provide: ServiceOptionsToken,
					useValue: {
						pollDuration: ( options.pollDuration || 3000 ),
						pollCadence: ( options.pollCadence || 50 )
					}
				}
			]
		});

	}

}
