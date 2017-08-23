import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
//import Data Module
import { Colonne } from '../../../shared/models/colonne';
//Import Colonne Service
import { ColonneService } from '../../../service/colonne.service';
//Import Colonne Service
import { Message,SelectItem } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'edit-modal',
    templateUrl: 'edit-modal.component.html'
})

export class EditModalComponent implements OnInit {
    // data modul payloaded from parent
    @Input() colonne : Colonne;
    // display Modal triggred by parent
    @Input() displayModal : boolean;
    // hide modal payloaded to parent
    @Output() hideModal = new EventEmitter<boolean>();
    //feedback message
    msgs : Message[] = [];

    constructor(private colonneService: ColonneService) { }

    ngOnInit() { 
        this.colonne = new Colonne;
    }

    save(){
        this.colonneService.update(this.colonne).subscribe(
            res => {
                    this.colonne = res;
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
        this.hideModal.emit(false);
    }

    // with the modal dismmissed
    onHide($event){
        this.hideModal.emit(false);
    }

    

}