import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ModalWindowMessage, ModalWindowConfirm } from '../../interfaces/modal-window.interface';

@Injectable({
	providedIn: 'root'
})
export class ModalWindowService {
	/** BehaviorSubject to show modal window message */
	private _message: BehaviorSubject<ModalWindowMessage> = new BehaviorSubject<ModalWindowMessage>(null);
	/** Modal window message observable */
	public readonly message$: Observable<ModalWindowMessage> = this._message.asObservable();
	/** BehaviorSubject to show modal window confirm */
	private _confirm: BehaviorSubject<ModalWindowConfirm> = new BehaviorSubject<ModalWindowConfirm>(null);
	/** Modal window confirm observable */
	public readonly confirm$: Observable<ModalWindowMessage> = this._confirm.asObservable();

	/**
	 * Open modal window to show message.
	 * @param message (ModalWindowMessage) data to show.
	 * @returns void
	 */
	public OpenMessage(message: ModalWindowMessage): void {
		this._message.next(message);
	}

	/**
	 * Open modal window to confirm an action.
	 * @param confirm (ModalWindowConfirm) data to show.
	 * @returns void
	 */
	public OpenConfirm(confirm: ModalWindowConfirm): void {
		this._confirm.next(confirm);
	}
}