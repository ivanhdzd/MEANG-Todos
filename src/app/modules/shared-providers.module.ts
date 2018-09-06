import { NgModule, ModuleWithProviders } from '@angular/core';

import { OnBeforeUnloadService } from '../services/on-before-unload/on-before-unload.service';
import { ModalWindowService } from '../services/modal-window/modal-window.service';
import { EventService } from '../services/event/event.service';

/**
 * Reference: https://alligator.io/angular/providers-shared-modules/
 */
@NgModule()
export class SharedProvidersModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedProvidersModule,
			providers: [OnBeforeUnloadService, ModalWindowService, EventService],
		};
	}
}