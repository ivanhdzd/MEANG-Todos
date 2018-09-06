import { Directive, Input, ElementRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { camel2title, capitalize } from '../../functions/helpers';

@Directive({
	selector: '[appFormControlErrors]',
})
export class FormControlErrorsDirective {
	/** Native element reference */
	private _element: HTMLElement = null;

	/** Form control name input string */
	@Input() public name: string = null;

	/** Errors input ValidationErrors property */
	@Input() public set errors(errors: ValidationErrors) {
		this._element.innerText = errors ? capitalize(this._parseFormControlErrors(this.name, errors)) : '';
	}

	/** Get native element reference from Angular ElementRef service */
	constructor(element: ElementRef) {
		this._element = element.nativeElement;
	}

	/**
	 * Parse form control object to string message.
	 * @param name (string) form control.
	 * @param errors (ValidationErrors) data.
	 * @returns (string) errors parsed to string.
	 */
	private _parseFormControlErrors(name: string, errors: ValidationErrors): string {
		/** Recursive function that generates string message from errors object */
		const _objErr2string: Function = (obj: any): string => {
			return Object.entries(obj).map(([key, val]) => {
				const title: string = camel2title(key).toLowerCase();
				switch (typeof val) {
					case 'boolean':
						if (key === 'required') return `${ camel2title(name).toLowerCase() } ${ key }.`;
						else if (key.toLowerCase() === name.toLowerCase()) return `${ title } format is invalid.`;
						else return `${ title } required.`;
					case 'number':
						return `${  title }: ${ val }`;
					case 'object':
						return _objErr2string(val);
				}
			}).join(', ');
		};
		return _objErr2string(errors);
	}
}