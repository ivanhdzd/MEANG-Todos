import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicGuard } from '../guards/can-activate/public/public.guard';
import { ClientGuard } from '../guards/can-activate/client/client.guard';
import { FormsChangesGuard } from '../guards/can-deactivate/forms-changes/forms-changes.guard';

import { HomeComponent } from '../pages/home/home.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, canActivate: [PublicGuard] },
	{ path: 'sign-in', component: SignInComponent, canActivate: [PublicGuard] },
	{ path: 'sign-up', component: SignUpComponent, canActivate: [PublicGuard], canDeactivate: [FormsChangesGuard] },
	{ path: 'client', canActivate: [ClientGuard], loadChildren: '../app-client/app-client.module#AppClientModule' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}