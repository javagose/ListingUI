import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import  { Rapport } from '../../shared/models/rapport';
import { TableParams} from '../../shared/models/table-params';

import { RapportService } from '../../service/rapport.service';
import { SharedService } from '../../shared/services/shared.service';

import {ConfirmDialogModule,ConfirmationService, MenuItem} from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'rapport',
    templateUrl: './rapport.component.html',
   
})

export class RapportComponent implements OnInit {

    // tableau des rapport
    rapports : Rapport[] = [];
    // display CRUD Modal
    displayDialog: boolean;
    //selected Rapport id
    selectedRapportId : number;
    selectedRapport : Rapport;
    //get Rapport after update 
    selectedRapportVersion : Rapport = new Rapport;

    items: MenuItem[];
    // rapport instance
    rapport: Rapport = new Rapport();
    // feedBack rapport to display after an operation
    msgs: Message[] = [];
    //windows width 
    windowWidth : string;
    //parametrage de shared-colonne comp
    parametres : any = {};

    //inject services in controller
    constructor(private rapportService: RapportService, 
            private confirmationService : ConfirmationService,
            private router : Router) {}

    // load colonnes on app Init
    ngOnInit() {
        this.loadRapports();
        //initialisé les params des tableaux 
        this.initializeParams();
        this.items = [
            {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteRapport(this.selectedRapport, this.selectedRapportId)},
            {label: 'details', icon: 'fa-eye', command: (event) => this.redirectToColonne(this.selectedRapport.id)}
            
        ]
     }

    // call api service to get colonnes
    loadRapports(){
        this.rapportService.findAll().subscribe( result =>{this.rapports = result})  
    }

    // delete rapport
    deleteRapport(rapport, index){
        this.rapport= SharedService.cloneItem(rapport);
        this.confirmationService.confirm({
            message: 'Do you want to delete '+this.rapport.nom+'?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.rapportService.delete(this.rapport.id).subscribe(
                    res => {
                        //push success feedback
                        this.rapports = this.rapports.filter((val,i) => i!=index);       
                        this.msgs = [];
                        this.msgs.push({severity:'success', summary:'Rapport deleted', detail:'your rapport has been deleted with success'});
                        },
                    err =>{
                        //push error feedback
                        this.msgs = [];
                        this.msgs.push({severity:'error', summary:'Error in Deleting', detail:err.code +" "+err.rapport});
                        });
                
                this.rapport = null;
                this.displayDialog = false;
            }
        });
    }

    
    handleChange(event, rapport?, field?){ 
        if(rapport) 
            //console.log(rapport, field)
            this.updateRapport(rapport, field)
        else
            //console.log(event.data,event.column.field)
            this.updateRapport(event.data,event.column.field)
    }


    updateRapport(rapport : Rapport, field? : string){
        this.rapport= SharedService.cloneItem(rapport);
        this.rapportService.patch(rapport.id, field, rapport[field]).subscribe(
                res => {
                    console.log('patch rapport');
                    this.msgs = [];
                    this.msgs.push({severity:'success', summary:'Rapport Modified', detail:'your rapport has been Modified with success'});
                    },
                err =>{
                    //push error feedback
                    console.log(rapport[field],field)
                    this.msgs = [];
                    this.msgs.push({severity:'error', summary:'Error in Editing', detail:err.code +" "+err.rapport});
                    }
            
            );
    }
    //on context menue select
    onRowSelect(event){
        this.selectedRapport= event.data; 
        this.selectedRapportId= SharedService.arrayObjectIndexOf(this.rapports,this.selectedRapport);
        console.log(this.selectedRapportId);
    }
    //O double click colonne redirect to colonnes
    redirectTo(event){
         this.router.navigate(['/rapport', event.data.id]);
    }
    //menue item function
    redirectToColonne(idRapport : number){
        console.log(idRapport);
         this.router.navigate(['/rapport', idRapport]);
    }

    initializeParams(){
    this.parametres.reorderableColumns= true;
    this.parametres.resizableColumns = true ; 
    this.parametres.responsive = true;
    this.parametres.scrollable = true; 
    this.parametres.paginator = true; 
    this.parametres.rows = 10; 
    this.parametres.editable = true; 
    this.parametres.uri = "rapports/";
    //maintains Table view width, this var will be binded to TataTable
    this.parametres.windowWidth = (window.innerWidth-80) +"px";
    }
    
}