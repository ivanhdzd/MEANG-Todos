import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalWindowService } from '../../../services/modal-window/modal-window.service';
import { ModalWindowConfirm } from '../../../interfaces/modal-window.interface';

/** JQuery */
declare var $;

@Component({
	selector: 'app-modal-window-confirm',
	templateUrl: './modal-window-confirm.component.html',
	styleUrls: ['./modal-window-confirm.component.scss']
})
export class ModalWindowConfirmComponent implements OnInit, OnDestroy {
	/** Reference to btn to show popup, it's hidden */
	private _btn: HTMLButtonElement = null;
	/** Modal window message subscription */
	private _sub: Subscription = null;

	/** Popup title */
	public title: string = null;
	/** Popup message */
	public message: string = null;
	/** Callback function if user press accept button */
	private _callbackOnAccept: Function = null;
	/** Callback function if user press cancel button (Optional) */
	private _callbackOnCancel: Function = null;
	/** Button flag */
	private _btnFlag: boolean = false;

	constructor(private modalWindowService: ModalWindowService) {}

	/**
	 * Subscript to modal window message.
	 * @returns void
	 */
	public ngOnInit(): void {
		this._btn = <HTMLButtonElement>document.getElementById('btn-show-modal-confirm');

		this._sub = this.modalWindowService.confirm$.subscribe((data: ModalWindowConfirm) => {
			if (!data) return;
			this.title = data.title;
			this.message = data.message;
			this._callbackOnAccept = data.callbackOnAccept;
			if (data.callbackOnCancel) this._callbackOnCancel = data.callbackOnCancel;
			this._btnFlag = false;
			this._btn.click();
		});
		/** Handle hide modal window event */
		$('#confirm-modal').on('hidden.bs.modal', () => {
			if (!this._btnFlag) this.Cancel();
			this._btnFlag = false;
		});
	}

	/**
	 * Unsubscript to modal window message.
	 * @returns void
	 */
	public ngOnDestroy(): void {
		this._sub.unsubscribe();
	}

	/**
	 * Executes accept callback.
	 * @returns void
	 */
	public Accept(): void {
		this._btnFlag = true;
		this._callbackOnAccept();
	}

	/**
	 * Executes cancel callback.
	 * @returns void
	 */
	public Cancel(): void {
		this._btnFlag = true;
		if (this._callbackOnCancel) this._callbackOnCancel();
	}
}