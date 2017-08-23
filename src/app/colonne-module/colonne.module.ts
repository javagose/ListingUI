import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { DataTableModule, SharedModule, DialogModule, ConfirmDialogModule, 
    ConfirmationService, GrowlModule, PanelModule, InputSwitchModule, 
    CheckboxModule,TooltipModule,ContextMenuModule,RadioButtonModule  } from 'primeng/primeng';
    

import {InputTextModule, FieldsetModule, InputTextareaModule, TabViewModule} from 'primeng/primeng';

import { ColonneService } from '../service/colonne.service';
import { IndexComponent } from './index.component';
import { ColonneComponent } from './components/colonne.component';
import { AddColonneComponent } from './components/add-form/add-form.component';
import { InternalColonneComponent} from './components/internal-colonne/internal-colonne.component';
import { DetailsComponent } from './components/details/details.component';
import {EditModalComponent} from './components/edit-modal/edit-modal.component';


const colonnesRoutes: Routes = [
  { 
      path: 'rapport/:idRapport', 
      component: IndexComponent,
      data : { title : 'colonnes list'}
 },
 { 
      path: 'internal-colonne',      
      component: AddColonneComponent,
      data : { title : 'Internal colonne'}
 },
];


@NgModule({
    imports: [
            RouterModule.forRoot(colonnesRoutes),
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
            RadioButtonModule,
            //styles
            InputTextModule, 
            FieldsetModule,
            InputTextareaModule
             ],

    exports: [IndexComponent,
            ColonneComponent,
            AddColonneComponent,
            InternalColonneComponent,
            DetailsComponent,
            EditModalComponent],
    declarations: [IndexComponent,
                ColonneComponent,
                AddColonneComponent,
                InternalColonneComponent,
                DetailsComponent,
                EditModalComponent],
    providers:[ ColonneService,
                ConfirmationService ]
})
export class ColonneModule { }
