import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowConfirmComponent } from './modal-window-confirm.component';

describe('ModalWindowConfirmComponent', () => {
	let component: ModalWindowConfirmComponent;
	let fixture: ComponentFixture<ModalWindowConfirmComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ModalWindowConfirmComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalWindowConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});