import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowMessageComponent } from './modal-window-message.component';

describe('ModalWindowMessageComponent', () => {
	let component: ModalWindowMessageComponent;
	let fixture: ComponentFixture<ModalWindowMessageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ModalWindowMessageComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalWindowMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});