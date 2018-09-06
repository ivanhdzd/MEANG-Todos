import { TestBed, inject } from '@angular/core/testing';

import { ModalWindowService } from './modal-window.service';

describe('ModalWindowService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ModalWindowService]
		});
	});

	it('should be created', inject(
		[ModalWindowService],
		(service: ModalWindowService) => {
			expect(service).toBeTruthy();
		}
	));
});