import { Directive, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';

@Directive({
	selector: '[appTextTypingAnimation]'
})
export class TextTypingAnimationDirective  implements OnInit, AfterViewInit {
	/** Input text to set typing effect */
	@Input() public text: string = 'Add your text by an Angular Input.';
	/** Latency time in each typing */
	@Input() public latencyTime: number = 0.125;
	/** Wait to invert effect */
	@Input() public waitAtTheEnd: number = 1;
	/** Pointer to set into end to text */
	@Input() public pointer: string = '&#9612;'; /** http://www.webusable.com/CharsExtendedTable.htm */

	/** Main container DOM object reference */
	private _mainContainer: HTMLElement = null;
	/** text container DOM object reference */
	private _textContainer: HTMLElement = null;
	/** style container DOM object reference */
	private _styleContainer: HTMLElement = null;
	/** pointer container DOM object reference */
	private _pointerContainer: HTMLElement = null;

	/** Interval reference */
	private _interval: any = null;
	/** Text length effetc */
	private _length: number = 0;
	/** Text count effetc */
	private _count: number = 0;

	/**
	 * CSS style content.
	 * Reference: https://codepen.io/sekane81/pen/JKuwb
	 */
	private _styleContent: string = `
		.text-animation-typing-pointer {
			animation: blink-animation 0.75s steps(5, start) infinite;
			-webkit-animation: blink-animation 0.75s steps(5, start) infinite;
			-moz-animation: blink-animation 0.75s steps(5, start) infinite;
		}
		@keyframes blink-animation {
			to {
				visibility: hidden;
			}
		}
		@-webkit-keyframes blink-animation {
			to {
				visibility: hidden;
			}
		}
		@-moz-keyframes blink-animation {
			to {
				visibility: hidden;
			}
		}
	`;

	constructor(element: ElementRef) {
		this._mainContainer = element.nativeElement;
	}

	/**
	 * Prepare additional objects to can works.
	 * @returns void
	 */
	public ngOnInit(): void {
		this._styleContainer = document.createElement('style');
		this._styleContainer.innerHTML = this._styleContent;
		this._mainContainer.appendChild(this._styleContainer);

		this._textContainer = document.createElement('font');
		this._mainContainer.appendChild(this._textContainer);

		this._pointerContainer = document.createElement('font');
		this._pointerContainer.setAttribute('class', 'text-animation-typing-pointer');
		this._pointerContainer.innerHTML = this.pointer;
		this._mainContainer.appendChild(this._pointerContainer);
	}

	/**
	 * Start animation.
	 * @returns void
	 */
	public ngAfterViewInit(): void {
		this._length = this.text.length;
		this.waitAtTheEnd *= 1000;
		this.latencyTime *= 1000;
		this._Write();
	}

	/**
	 * Write each character.
	 * @returns void
	 */
	private _Write(): void {
		const self: TextTypingAnimationDirective = this;
		self._interval = setInterval(() => {
			if (self._count > self._length) {
				clearInterval(self._interval);
				return setTimeout(() => self._Erase(), self.waitAtTheEnd);
			}
			const text: string = self.text.substring(0, self._count);
			self._textContainer.innerHTML = `${ text }`;
			++self._count;
		}, self.latencyTime);
	}

	/**
	 * Erase each character.
	 * @returns void
	 */
	private _Erase(): void {
		const self: TextTypingAnimationDirective = this;
		self._interval = setInterval(() => {
			if (self._count === 0) {
				clearInterval(self._interval);
				return setTimeout(() => self._Write(), self.waitAtTheEnd);
			}
			self._count--;
			const text: string = self.text.substring(0, self._count);
			self._textContainer.innerHTML = `${ text }`;
		}, self.latencyTime);
	}
}