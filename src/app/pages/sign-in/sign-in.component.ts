import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { ModalWindowService } from '../../services/modal-window/modal-window.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
	public form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.minLength(6), Validators.required]),
	});

	constructor(
		title: Title,
		private router: Router,
		private auth: AuthService,
		private modal: ModalWindowService
	) {
		title.setTitle('TODOS - Sign in');
	}

	/**
	 * Set scroll to top.
	 * @return void
	 */
	public ngOnInit(): void {
		window.scroll(0, 0);
	}

	/**
	 * Check if a form control is valid.
	 * @param property (string) to validate.
	 * @returns Form control errors.
	 */
	public FrmCtrlErrs(property: string): ValidationErrors {
		return this.form.controls[property].errors;
	}

	/**
	 * Sign in an user by email and password, get from form.
	 * @returns Promise<void>
	 */
	public async SignIn(): Promise<void> {
		try {
			const { email, password } = this.form.value;
			await this.auth.SignIn(email, password);
			this.form.reset();
			this.modal.OpenMessage({
				title: 'Welcome!',
				message: 'You are sign in successfully.'
			});
			this.router.navigateByUrl('/client/todos');
		} catch (err) {
			console.warn('[ERROR] SignInComponent.SignIn:', err);
			this.form.get('email').reset();
			this.form.get('password').reset();
			this.modal.OpenMessage({
				title: 'Oops!',
				message: 'Your email or password is wrong!'
			});
		}
	}
}