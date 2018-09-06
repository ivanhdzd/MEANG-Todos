import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { OnBeforeUnloadService } from '../../../../services/on-before-unload/on-before-unload.service';
import { ModalWindowService } from '../../../../services/modal-window/modal-window.service';

import { CreateTodoComponent } from '../../../pages/create-todo/create-todo.component';
import { TodoComponent } from '../../../pages/todo/todo.component';

@Injectable()
export class FormsChangesGuard implements CanDeactivate<CreateTodoComponent | TodoComponent> {
	constructor(
		private router: Router,
		private onBeforeUnload: OnBeforeUnloadService,
		private modalWindow: ModalWindowService
	) {}

	/**
	 * Prevents that user tries to leave a route without save unsaved changes.
	 * @param component (CreateTodoComponent | TodoComponent) not used.
	 * @param currentRoute (ActivatedRouteSnapshot) not used.
	 * @param currentState (RouterStateSnapshot) not used.
	 * @param nextState (RouterStateSnapshot) used to can get next url.
	 * @returns boolean
	 */
	public canDeactivate(
		component: CreateTodoComponent | TodoComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState: RouterStateSnapshot
	): boolean {
		if (!this.onBeforeUnload.thereAreChanges) return true;
		this.modalWindow.OpenConfirm({
			title: 'There are unsaved changes.',
			message: 'Sure do you want to discard unsaved changes?',
			callbackOnAccept: () => {
				this.onBeforeUnload.thereAreChanges = false;
				this.router.navigateByUrl(nextState.url);
			}
		});
		return false;
	}
}