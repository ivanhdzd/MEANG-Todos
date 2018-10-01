import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalWindowService } from '../../../services/modal-window/modal-window.service';
import { ModalWindowMessage } from '../../../interfaces/modal-window.interface';

@Component({
	selector: 'app-modal-window-message',
	templateUrl: './modal-window-message.component.html',
	styleUrls: ['./modal-window-message.component.scss']
})
export class ModalWindowMessageComponent implements OnInit, OnDestroy {
	/** Reference to btn to show popup, it's hidden */
	private _btn: HTMLButtonElement = null;
	/** Modal window message subscription */
	private _sub: Subscription = null;

	/** Popup title */
	public title: string = null;
	/** Popup message */
	public message: string = null;

	constructor(private modalWindowService: ModalWindowService) {}

	/**
	 * Subscript to modal window message.
	 * @returns void
	 */
	public ngOnInit(): void {
		this._btn = <HTMLButtonElement>document.getElementById('btn-show-modal-message');
		this._sub = this.modalWindowService.message$.subscribe((data: ModalWindowMessage) => {
			if (!data) return;
			this.title = data.title;
			this.message = data.message;
			this._btn.click();
		});
	}

	/**
	 * Unsubscript to modal window message.
	 * @returns void
	 */
	public ngOnDestroy(): void {
		this._sub.unsubscribe();
	}
}