import { Pipe, PipeTransform } from '@angular/core';

import { capitalize } from '../../functions/helpers';

@Pipe({
	name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
	/**
	 * Capitalize input value pipe function.
	 * @param value Capitalized value.
	 */
	public transform(value: string): string {
		return capitalize(value);
	}
}