import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ModalWindowMessage, ModalWindowConfirm } from '../../interfaces/modal-window.interface';

@Injectable({
	providedIn: 'root'
})
export class ModalWindowService {
	/** BehaviorSubject to show modal window message */
	private _message: BehaviorSubject<ModalWindowMessage> = new BehaviorSubject<ModalWindowMessage>(null);
	/** BehaviorSubject to show modal window confirm */
	private _confirm: BehaviorSubject<ModalWindowConfirm> = new BehaviorSubject<ModalWindowConfirm>(null);

	/**
	 * Subscribe to BehaviorSubject message.
	 * @param callback (Function) to execute in each message data change.
	 * * @returns Subscription
	 */
	public SubscribeToMessage(callback: Function): Subscription {
		return this._message.subscribe((message: ModalWindowMessage) => callback(message));
	}

	/**
	 * Subscribe to BehaviorSubject confirm.
	 * @param callback (Function) to execute in each confirm data change.
	 * @returns Subscription
	 */
	public SubscribeToConfirm(callback: Function): Subscription {
		return this._confirm.subscribe((confirm: ModalWindowConfirm) => callback(confirm));
	}

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