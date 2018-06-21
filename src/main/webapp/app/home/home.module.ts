import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { TodoGatewaySharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { TodoService } from './todo.service';

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        MatSnackBarModule,
        TodoGatewaySharedModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
      TodoService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoGatewayHomeModule {}
