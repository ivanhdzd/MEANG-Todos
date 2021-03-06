import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';
import { AUTH_STATUS } from '../../../enumerators/auth-status.enumerator';

@Injectable()
export class PublicGuard implements CanActivate {
	constructor(private router: Router, private auth: AuthService) {}

	/**
	 * Validate that there are any client user isn't already logged to can access.
	 * @returns Promise<boolean> if there aren't any client already logged.
	 */
	public canActivate(): Promise<boolean> {
		return new Promise((resolve: Function) => {
			this.auth.status$.subscribe((status: AUTH_STATUS) => {
				switch (status) {
					case AUTH_STATUS.LOADING:
						break;
					case AUTH_STATUS.PUBLIC:
						return resolve(true);
					case AUTH_STATUS.CLIENT:
						this.router.navigateByUrl('/client/todos');
						return resolve(false);
				}
			});
		});
	}
}