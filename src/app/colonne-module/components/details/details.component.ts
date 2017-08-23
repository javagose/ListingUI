import { Component, OnInit, Input } from '@angular/core';
import {RapportService} from '../../../service/rapport.service';
import {Rapport} from '../../../shared/models/rapport';
import { Message,SelectItem } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'details-rapport',
    templateUrl: 'details.component.html'
})

export class DetailsComponent implements OnInit {

    editing : boolean = false; 
    // get id rapport from parent
    @Input() rapport : Rapport;
    // feedBack rapport to display after an operation
    msgs: Message[] = [];
    //boolean show update requte Dialog
    display : Boolean;
    //update requete action
    updateAction: string = "aucuneAction";


    constructor(private rapportService: RapportService) { }

    ngOnInit() { 
    }

     editRapport(){
        this.rapportService.update(this.rapport).subscribe(
                res => {
                    
                    this.rapport = res;
                    //push success feedback
                    this.msgs = [];
                    this.msgs.push({severity:'success', summary:'Rapport Modified', detail:'your rapport has been Modified with success'});
                    },
                err =>{
                    //push error feedback
                    this.msgs = [];
                    this.msgs.push({severity:'error', summary:'Error in Editing', detail:err.code +" "+err.rapport});
                    }
            
            );

            this.editing = false;
    }
    updateRequete(){
        this.rapportService.patch(this.rapport.id,"requete",this.rapport.requete, this.updateAction).subscribe(
                res => {
                    //push success feedback
                    this.msgs = [];
                    this.msgs.push({severity:'success', summary:'Rapport Modified', detail:'your rapport has been Modified with success'});
                    },
                err =>{
                    //push error feedback
                    this.msgs = [];
                    this.msgs.push({severity:'error', summary:'Error in Editing', detail:err.code +" "+err.rapport});
                    });
        //hide dialog
        this.display = false

    }
}