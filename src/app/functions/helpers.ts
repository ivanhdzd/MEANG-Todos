import { Observable, Subscription } from 'rxjs';

/**
 * Clone an object
 * @param input (any) object to clone.
 * @returns any
 */
export function clone(input): any {
	return JSON.parse(JSON.stringify(input));
}

/**
 * Get a observable value by a promise.
 * @param observable (Observable<any>) to get it value.
 * @returns Promise<any>
 */
export async function observable2promise(observable: Observable<any>): Promise<any> {
	return new Promise((resolve: Function, reject: Function) => {
		const sub: Subscription = observable.subscribe((data: any) => {
			if (sub) sub.unsubscribe();
			resolve(data);
		}, (err: Error) => {
			if (sub) sub.unsubscribe();
			reject(err);
		});
	});
}

/**
 * Parse camel string to title string notations.
 * @param input (string) to parse to title notation.
 * @returns (string) title notation string.
 */
export function camel2title(input: string): string {
	const alphabethicalRegEx: RegExp = /^[A-Z]{1}$/;
	const numericRegEx: RegExp = /^[0-9]{1}$/;
	const spacesRegEx: RegExp = /\s{2,}/g;
	const arr: string[] = input.split('');
	return arr.reduce((accumulator: string, char: string) => {
		if (alphabethicalRegEx.test(char)) accumulator += ` ${ char }`;
		else if (numericRegEx.test(char)) accumulator += ` ${ char } `;
		else accumulator += char;
		return accumulator;
	}, '').replace(spacesRegEx, ' ').trim();
}

/**
 * Capitalize an string.
 * @param input (string) value to capitalize.
 * @returns (string) capitalized.
 */
export function capitalize(input: string): string {
	if (!input || input.length < 1) return '';
	return `${ input[0].toUpperCase() }${ input.substring(1, input.length) }`;
}