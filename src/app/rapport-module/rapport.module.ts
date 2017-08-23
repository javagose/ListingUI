import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { DataTableModule, SharedModule, DialogModule, ConfirmDialogModule, 
    ConfirmationService, GrowlModule, PanelModule, InputSwitchModule, 
    CheckboxModule,TooltipModule,ContextMenuModule  } from 'primeng/primeng';

import {InputTextModule, FieldsetModule, InputTextareaModule, TabViewModule} from 'primeng/primeng';

import { RapportService } from '../service/rapport.service';
import { IndexComponent} from './index.component';
import { RapportComponent } from './components/rapport.component';
import { AddRapportComponent } from './components/add-form/add-form.component';
//import Shared Module 
import { Qs_SharedModule } from '../shared/shared.module'

const rapportsRoutes: Routes = [
  { 
      path: 'rapports', 
      component: RapportComponent,
      data : { title : 'rapports list'}
 },
 { 
      path: 'ajouter-rapports',      
      component: AddRapportComponent,
      data : { title : 'ajouter rapprots'}
 },
 { path: '',
    component: IndexComponent,
    data : {title : 'rapports'}
  }
];


@NgModule({
    imports: [
            RouterModule.forRoot(rapportsRoutes),
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpModule,
            DataTableModule,
            SharedModule, 
            DialogModule,
            ConfirmDialogModule,
            GrowlModule,
            PanelModule,
            InputSwitchModule,
            CheckboxModule,
            TooltipModule ,
            ContextMenuModule,
            TabViewModule,
            //style
            InputTextModule,
            FieldsetModule, 
            InputTextareaModule,
            //shared
            Qs_SharedModule
             ],

    exports: [IndexComponent,
            RapportComponent,
            AddRapportComponent],
    declarations: [IndexComponent,
                RapportComponent,
                AddRapportComponent],
    providers:[ RapportService,
                ConfirmationService ]
})
export class RapportModule { }
