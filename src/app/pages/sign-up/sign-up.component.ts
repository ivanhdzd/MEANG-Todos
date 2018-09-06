import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';

import { PasswordValidator } from '../../classes/password-validator.class';
import { OnBeforeUnloadService } from '../../services/on-before-unload/on-before-unload.service';
import { ModalWindowService } from '../../services/modal-window/modal-window.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
	public form: FormGroup = new FormGroup({
		name: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		motherLastName: new FormControl('', Validators.required),
		username: new FormControl('', Validators.required),
		phone: new FormControl('', [Validators.minLength(7), Validators.maxLength(15), Validators.required]),
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.minLength(6), Validators.required]),
		confirmPassword: new FormControl('', [Validators.minLength(6), Validators.required])
	}, PasswordValidator.MatchPassword);

	constructor(
		title: Title,
		private router: Router,
		private onBeforeUnload: OnBeforeUnloadService,
		private modal: ModalWindowService,
		private auth: AuthService
	) {
		title.setTitle('TODOS - Sign up');
	}

	/**
	 * Set scroll to top.
	 * @return void
	 */
	public ngOnInit(): void {
		window.scroll(0, 0);
	}

	/**
	 * Registry that there are changes unsaved.
	 * @returns void
	 */
	public Change(): void {
		this.onBeforeUnload.thereAreChanges = true;
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
	 * Sign up new user.
	 * @returns Promise<void>
	 */
	public async SignUp(): Promise<void> {
		try {
			const password: string = this.form.get('password').value;
			const user: User = this.form.value;
			delete user['confirmPassword'];
			delete user['password'];
			await this.auth.SignUp(user, password);
			this.onBeforeUnload.thereAreChanges = false;
			this.form.reset();
			this.modal.OpenMessage({
				title: 'Your user was registered successfully!',
				message: 'You can sign in with your new user info.'
			});
			this.router.navigateByUrl('/sign-in');
		} catch (err) {
			console.warn('[ERROR] SignUpComponent.SignUp:', err);
			this.form.get('username').reset();
			this.form.get('email').reset();
			this.form.get('password').reset();
			this.form.get('confirmPassword').reset();
			this.modal.OpenMessage({
				title: 'Oops!',
				message: 'Your username or email is already taken, change it!'
			});
		}
	}

	/**
	 * Cancel sign up and go to root route.
	 * @returns void
	 */
	public Cancel(): void {
		this.modal.OpenConfirm({
			title: 'Sure do you want to discard your user registration?',
			message: 'There are changes unsaved',
			callbackOnAccept: () => {
				this.form.reset();
				this.onBeforeUnload.thereAreChanges = false;
				this.router.navigateByUrl('/');
			}
		});
	}
}