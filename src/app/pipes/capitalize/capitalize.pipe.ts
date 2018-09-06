import { Pipe, PipeTransform } from '@angular/core';

import { capitalize } from '../../functions/helpers';

@Pipe({
	name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
	transform(value: string): string {
		return capitalize(value);
	}
}