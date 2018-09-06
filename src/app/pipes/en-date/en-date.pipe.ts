import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'enDate'
})
export class EnDatePipe implements PipeTransform {
	public transform(value: string): string {
		return moment(new Date(value)).format('MMMM Do YYYY, h:mm:ss a');
	}
}