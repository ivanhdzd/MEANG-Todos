import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './modules/app-routing.module';
import { NgrxStoreModule } from './modules/ngrx-store.module';
import { SharedProvidersModule } from './modules/shared-providers.module';
import { SharedModule } from './modules/shared.module';

import { AuthService } from './services/auth/auth.service';

import { PublicGuard } from './guards/can-activate/public/public.guard';
import { ClientGuard } from './guards/can-activate/client/client.guard';
import { FormsChangesGuard } from './guards/can-deactivate/forms-changes/forms-changes.guard';

import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { ModalWindowConfirmComponent } from './components/modals/modal-window-confirm/modal-window-confirm.component';
import { ModalWindowMessageComponent } from './components/modals/modal-window-message/modal-window-message.component';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		HomeComponent,
		SignInComponent,
		SignUpComponent,
		PageNotFoundComponent,
		ModalWindowConfirmComponent,
		ModalWindowMessageComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		NgrxStoreModule,
		SharedProvidersModule,
		SharedModule
	],
	providers: [
		AuthService,
		PublicGuard,
		ClientGuard,
		FormsChangesGuard
	]
})
export class AppModule {}