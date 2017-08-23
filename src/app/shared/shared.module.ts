import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DialogModule, DataTableModule, SharedModule, ButtonModule, InputSwitchModule, 
        ConfirmDialogModule, GrowlModule, ConfirmationService, 
        ContextMenuModule, } from 'primeng/primeng';

import { SharedTableComponent } from './components/shared-table.component';

@NgModule({
    imports: [CommonModule, 
            DataTableModule,
            SharedModule,
            ButtonModule,
            InputSwitchModule,
            FormsModule,
            GrowlModule, 
            ReactiveFormsModule,
            ConfirmDialogModule,
            ContextMenuModule,
            DialogModule],

    exports: [CommonModule,
            SharedModule,
            SharedTableComponent,
            ButtonModule,
            InputSwitchModule,
            FormsModule,
            GrowlModule, 
            ReactiveFormsModule,
            ConfirmDialogModule,
            DialogModule],
            
    declarations: [SharedTableComponent],
    providers: [ConfirmationService],
})
export class Qs_SharedModule { }
