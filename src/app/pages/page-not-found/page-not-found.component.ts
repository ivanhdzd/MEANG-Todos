import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
	/** Seconds to await before redirect to index page */
	public seconds: number = 5;

	constructor(title: Title, private router: Router) {
		title.setTitle('TODOS - 404 page not found');
	}

	/**
	 * Start interval to reduce seconds, then go to todos route.
	 * @returns void
	 */
	public ngOnInit(): void {
		window.scroll(0, 0);
		const interval = setInterval(() => {
			if (this.seconds > 0) return --this.seconds;
			this.router.navigateByUrl('/');
			clearInterval(interval);
		}, 1000);
	}
}