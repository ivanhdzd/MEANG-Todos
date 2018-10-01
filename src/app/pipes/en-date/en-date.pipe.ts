import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'enDate'
})
export class EnDatePipe implements PipeTransform {
	/**
	 * Set english date format input value pipe function.
	 * @param value date with a specific date format.
	 */
	public transform(value: string): string {
		return moment(new Date(value)).format('MMMM Do YYYY, h:mm:ss a');
	}
}