import { TestBed, async, inject } from '@angular/core/testing';

import { FormsChangesGuard } from './forms-changes.guard';

describe('FormsChangesGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FormsChangesGuard]
		});
	});

	it('should ...', inject([FormsChangesGuard], (guard: FormsChangesGuard) => {
		expect(guard).toBeTruthy();
	}));
});