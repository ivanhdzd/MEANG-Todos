import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';

import { OnBeforeUnloadService } from '../../../../services/on-before-unload/on-before-unload.service';
import { ModalWindowService } from '../../../../services/modal-window/modal-window.service';
import { Todo } from '../../../../models/todo.model';

@Component({
	selector: 'app-todo-form',
	templateUrl: './todo-form.component.html',
	styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
	public form: FormGroup = new FormGroup({
		title: new FormControl('', Validators.required),
		status: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required),
	});

	@Input() public todo: Todo = null;

	@Output() private OnSubmit: EventEmitter<Todo> = new EventEmitter<Todo>();
	@Output() private OnCancel: EventEmitter<void> = new EventEmitter<void>();

	constructor(private onBeforeUnload: OnBeforeUnloadService, private modal: ModalWindowService) {}

	/**
	 * If a todo was provided, set it data in form.
	 * @returns void
	 */
	public ngOnInit(): void {
		try {
			if (this.todo) this.form.setValue({
				title: this.todo.title,
				status: this.todo.status,
				description: this.todo.description
			});
		} catch (err) {
			console.warn('[ERROR] TodoFormComponent.ngOnInit:', err);
		}
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
	 * Get todo data from form and emit it to parent component.
	 * @returns void
	 */
	public Submit(): void {
		try {
			if (this.todo) {
				const id: string = this.todo.id;
				this.todo = this.form.value;
				this.todo.id = id;
				this.OnSubmit.emit(this.todo);
			} else {
				this.OnSubmit.emit(this.form.value);
			}
			this.form.reset();
		} catch (err) {
			console.warn('[ERROR] TodoFormComponent.Submit', err);
		}
	}

	/**
	 * Cancel todo data and emit cancel event.
	 * @returns void
	 */
	public Cancel(): void {
		this.modal.OpenConfirm({
			title: 'Sure do you want to discard changes?',
			message: 'There are changes unsaved',
			callbackOnAccept: () => {
				this.onBeforeUnload.thereAreChanges = false;
				this.OnCancel.emit();
				this.form.reset();
			}
		});
	}
}