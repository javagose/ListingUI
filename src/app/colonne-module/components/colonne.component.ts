import { Component, OnInit,Input  } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import  { Colonne } from '../../shared/models/colonne';

import { ColonneService } from '../../service/colonne.service';
import { SharedService } from '../../shared/services/shared.service';

import {ConfirmDialogModule,ConfirmationService, MenuItem} from 'primeng/primeng';
import { Message } from 'primeng/primeng';


@Component({
    selector: 'colonne',
    templateUrl: './colonne.component.html',
   
})

export class ColonneComponent implements OnInit {

    //id de rapport
    @Input() idRapport : number;
    // tableau des colonne
    colonnes : Colonne[] = [];
    // colonne instance
    colonne: Colonne = new Colonne();
    //selected Colonne 
    selectedColonneId : number;
    selectedColonne : Colonne;
    // display Edit Modal 
    diplayEditModal : boolean;
    // context menue items
    items: MenuItem[];
    // feedBack colonne to display after an operation
    msgs: Message[] = [];
    //windows width 
    windowWidth : string;

    //inject services in controller
    constructor(private colonneService: ColonneService, 
                private confirmationService : ConfirmationService) {}

    
    ngOnInit() {
        //maintains Table view width, this var will be binded to TataTable
        this.windowWidth = (window.innerWidth-80) +"px";
        //call loadColonnes on app Init
        this.loadColonnes(this.idRapport);
        // instanciate context menue(right-click) items
        this.items = [
            {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteColonne(this.selectedColonne, this.selectedColonneId)},
            {label: 'Edit', icon: 'fa-pencil', command: (event) => this.showEditModal()}
        
        ]
     }

    // call api service to get colonnes
    loadColonnes(idRapport : number){
        this.colonneService.findRapportColonnes(idRapport, false).subscribe( result =>{this.colonnes = result})  
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
            }
        });
    }

    // event triggred on table field change
    handleChange(event, colonne?, field?){ 
        if(colonne) 
            this.updateColonne(colonne, field)
        else
            this.updateColonne(event.data,event.column.field)
    }

    updateColonne(colonne : Colonne, field?: string){
        this.colonne= SharedService.cloneItem(colonne);
        //if field order cast it to number
        if(field="ordre")
            colonne[field] =+colonne[field];      
        this.colonneService.patch(colonne.id, field, colonne[field]).subscribe(
                res => {
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