import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EventService {
	private _events: Map<string, BehaviorSubject<any>> = new Map();

	/**
	 * Publish a value in specific BehaviorSubject.
	 * @param name (string) BehaviorSubject to publish.
	 * @param value (any) value to set in BehaviorSubject.
	 * @returns void
	 */
	public publish(name: string, value: any = null): void {
		if (!this._events.get(name)) this._events.set(name, new BehaviorSubject<any>(value));
		else this._events.get(name).next(value);
	}

	/**
	 * Subscribe to a BehaviorSubject.
	 * @param name (string) subscription to get.
	 * @param callback (Function) to inject to subscription.
	 * @returns Subscription.
	 */
	public subscribe(name: string, callback: Function): Subscription {
		if (!this._events.get(name)) this._events.set(name, new BehaviorSubject<any>(null));
		return this._events.get(name).subscribe(evt => callback(evt));
	}
}