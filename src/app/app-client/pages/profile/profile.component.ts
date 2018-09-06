import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../../models/user.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
	private _usrSub: Subscription = null;

	public user: User = null;

	constructor(title: Title, private auth: AuthService) {
		title.setTitle('TODOS - Profile');
	}

	/**
	 * Set scroll to top.
	 * @return void
	 */
	public ngOnInit(): void {
		window.scroll(0, 0);
		try {
			this._usrSub = this.auth.Subscribe2CurrentUser((user: User) => this.user = user);
		} catch (err) {
			console.warn('[ERROR] ProfileComponent.ngOnInit:', err);
		}
	}

	/**
	 * Unsubscribe to user data subscription.
	 */
	public ngOnDestroy(): void {
		if (this._usrSub) this._usrSub.unsubscribe();
	}
}