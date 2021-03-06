import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';
import { AUTH_STATUS } from '../../../enumerators/auth-status.enumerator';

@Injectable()
export class ClientGuard implements CanActivate {
	constructor(private router: Router, private auth: AuthService) {}

	/**
	 * Validate that a client user is already logged to can access.
	 * @returns Promise<boolean> if current user is a valid client.
	 */
	public canActivate(): Promise<boolean> {
		return new Promise((resolve: Function) => {
			this.auth.status$.subscribe((status: AUTH_STATUS) => {
				switch (status) {
					case AUTH_STATUS.LOADING:
						break;
					case AUTH_STATUS.PUBLIC:
						this.router.navigateByUrl('/');
						return resolve(false);
					case AUTH_STATUS.CLIENT:
						return resolve(true);
				}
			});
		});
	}
}