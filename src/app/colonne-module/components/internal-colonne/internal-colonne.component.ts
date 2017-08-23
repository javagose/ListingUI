import { Component, OnInit, Input  } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import  { InternalColonne } from '../../../shared/models/internal-colonne';

import { ColonneService } from '../../../service/colonne.service';
import { SharedService } from '../../../shared/services/shared.service';

import {ConfirmDialogModule,ConfirmationService, MenuItem} from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'internal-colonne',
    templateUrl: './internal-colonne.component.html',
   
})

export class InternalColonneComponent implements OnInit {

    // rapport id comming from parent via input
    @Input() idRapport; 
    // tableau des colonne
    colonnes : InternalColonne[] = [];
    // internal-colonne instance
    colonne: InternalColonne = new InternalColonne();
    // display Delete Modal
    displayDeleteDialog: boolean;
    // Display Edit Modal
    diplayEditModal : boolean;
    //selected Colonne id
    selectedColonneId : number;
    selectedColonne : InternalColonne;
    // context-menu items
    items: MenuItem[];
    // feedBack colonne to display after an operation
    msgs: Message[] = [];
    //windows width 
    windowWidth : string;

    //inject services in controller
    constructor(private colonneService: ColonneService, private confirmationService : ConfirmationService) {}

    // load colonnes on app Init
    ngOnInit() {
        this.windowWidth = (window.innerWidth-80) +"px";
        this.loadColonnes(this.idRapport);
        this.items = [
            {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteColonne(this.selectedColonne, this.selectedColonneId)}
        ]
     }

    // call api service to get colonnes
    loadColonnes(idRapport : number){
        console.log(idRapport);
        this.colonneService.findRapportColonnes(idRapport, true).subscribe( result =>{this.colonnes = result})  
    }

    // delete colonne
    deleteColonne(colonne, index){
        
        this.colonne= SharedService.cloneItem(colonne);
        this.confirmationService.confirm({
            message: 'Do you want to delete '+this.colonne.name+'?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.colonneService.delete(this.colonne.id).subscribe(
                    res => {
                        //push success feedback
                        this.colonnes = this.colonnes.filter((val,i) => i!=index);       
                        this.msgs = [];
                        this.msgs.push({severity:'success', summary:'Colonne deleted', detail:'your colonne has been deleted with success'});
                        },
                    err =>{
                        //push error feedback
                        this.msgs = [];
                        this.msgs.push({severity:'error', summary:'Error in Deleting', detail:err.code +" "+err.colonne});
                        });
                
                this.colonne = null;
                this.displayDeleteDialog = false;
            }
        });
    }

    handleChange(event, colonne?, field?){ 
        if(colonne) 
            this.updateColonne(colonne, field)
        else
            this.updateColonne(event.data,event.column.field)
    }

    updateColonne(colonne : InternalColonne, field?: string){
        //if field order cast it to number
        if(field="ordre")
            colonne[field] =+colonne[field];
       
        this.colonne= SharedService.cloneItem(colonne);
        this.colonneService.patch(colonne.id, field, colonne[field]).subscribe(
                res => {
                    //push success feedback
                    this.msgs = [];
                    this.msgs.push({severity:'success', summary:'Colonne Modified', detail:'your colonne has been Modified with success'});
                    },
                err =>{
                    //push error feedback
                    this.msgs = [];
                    this.msgs.push({severity:'error', summary:'Error in Editing', detail:err.code +" "+err.colonne});
                    }
            
            );
    }
    onRowSelect(event){
        this.selectedColonne= event.data; 
        this.selectedColonneId= SharedService.arrayObjectIndexOf(this.colonnes,this.selectedColonne);
    }

    //triger Edit Modal

    showEditModal(event?){
        this.diplayEditModal = true;
        if(event)
            this.selectedColonne = event.data;
    }
    
    //hide Edit Modal output Event
    hideEditModal(hide: boolean){
        this.diplayEditModal = hide;
        console.log(hide);
    }
    
}