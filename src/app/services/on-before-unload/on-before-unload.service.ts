import { Injectable } from '@angular/core';

declare var thereAreChangesOnBeforeUnload;

@Injectable({
	providedIn: 'root'
})
export class OnBeforeUnloadService {
	/**
	 * Get global thereAreChangesOnBeforeUnload variable value.
	 */
	public get thereAreChanges(): boolean {
		return thereAreChangesOnBeforeUnload;
	}

	/**
	 * Set global thereAreChangesOnBeforeUnload variable value.
	 */
	public set thereAreChanges(input: boolean) {
		thereAreChangesOnBeforeUnload = input;
	}
}