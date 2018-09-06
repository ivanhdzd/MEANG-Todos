import { AbstractControl } from '@angular/forms';

/**
 * Reference:
 * https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2
 */
export class PasswordValidator {
	public static MatchPassword(AC: AbstractControl) {
		const password: string = AC.get('password').value;
		const confirmPassword: string = AC.get('confirmPassword').value;

		if (password !== confirmPassword)
			AC.get('confirmPassword').setErrors({ MatchPassword: true });
		else return null;
	}
}