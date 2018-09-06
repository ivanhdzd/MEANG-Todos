import { TestBed, inject } from '@angular/core/testing';

import { OnBeforeUnloadService } from './on-before-unload.service';

describe('OnBeforeUnloadService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [OnBeforeUnloadService]
		});
	});

	it('should be created', inject(
		[OnBeforeUnloadService],
		(service: OnBeforeUnloadService) => {
			expect(service).toBeTruthy();
		}
	));
});