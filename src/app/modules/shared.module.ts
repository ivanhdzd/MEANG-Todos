import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApolloAngularModule } from './apollo-angular.module';

import { SpinnerComponent } from '../components/spinner/spinner.component';

import { TextTypingAnimationDirective } from '../directives/text-typing-animation/text-typing-animation.directive';
import { FormControlErrorsDirective } from '../directives/form-control-errors/form-control-errors.directive';

import { CapitalizePipe } from '../pipes/capitalize/capitalize.pipe';
import { EnDatePipe } from '../pipes/en-date/en-date.pipe';

@NgModule({
	imports: [
		CommonModule,
		ApolloAngularModule
	],
	declarations: [
		SpinnerComponent,
		TextTypingAnimationDirective,
		FormControlErrorsDirective,
		CapitalizePipe,
		EnDatePipe
	],
	exports: [
		CommonModule,
		ApolloAngularModule,
		SpinnerComponent,
		TextTypingAnimationDirective,
		FormControlErrorsDirective,
		CapitalizePipe,
		EnDatePipe,
	]
})
export class SharedModule {}