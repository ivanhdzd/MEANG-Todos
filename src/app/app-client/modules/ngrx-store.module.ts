import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { currentUser } from '../../ngrx/reducers/current-user.reducer';
import { todos } from '../../ngrx/reducers/todos.reducer';

@NgModule({
	imports: [
		StoreModule.forFeature('client', {
			currentUser,
			todos
		})
	]
})
export class NgrxStoreModule {}