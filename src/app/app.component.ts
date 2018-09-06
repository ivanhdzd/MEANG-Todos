import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './services/auth/auth.service';
import { AUTH_STATUS } from './enumerators/auth-status.enumerator';
import { User } from './models/user.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	private _navbarToggleBtn: HTMLElement = null;
	public dropdownOpen: boolean = false;

	public authStatus: AUTH_STATUS = AUTH_STATUS.LOADING;
	private _authStatusSub: Subscription = null;

	public currentUser: User = null;
	private _currentUserSub: Subscription = null;

	constructor(private auth: AuthService) {}

	/**
	 * Subscribe to authentication status.
	 * Get navbar togle button to manipulate it.
	 * @returns void
	 */
	public ngOnInit(): void {
		try {
			this._navbarToggleBtn = document.getElementById('navbar-toggler-button');
			this._currentUserSub = this.auth.Subscribe2CurrentUser((user: User) => this.currentUser = user);
			this._authStatusSub = this.auth.Subscribe2Status((status: AUTH_STATUS) => this.authStatus = status);
		} catch (err) {
			console.warn('[ERROR] AppComponent.ngOnInit:', err);
		}
	}

	/**
	 * Unsubscribe to authentication status.
	 * @returns void
	 */
	public ngOnDestroy(): void {
		if (this._authStatusSub) this._authStatusSub.unsubscribe();
		if (this._currentUserSub) this._currentUserSub.unsubscribe();
	}

	/**
	 * Close navbar dropdown menu.
	 * @returns void
	 */
	public CloseDropdown(): void {
		if (this._navbarToggleBtn.getAttribute('aria-expanded') === 'false') return;
		if (window.innerWidth < 634) this._navbarToggleBtn.click();
		this.dropdownOpen = false;
	}

	/**
	 * Sign out curent user.
	 * @returns void
	 */
	public SignOut(): void {
		this.auth.SignOut();
	}
}