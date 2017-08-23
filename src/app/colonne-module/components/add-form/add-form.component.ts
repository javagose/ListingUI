import { Component, OnInit, Input } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import  { InternalColonne } from '../../../shared/models/internal-colonne';
import { Rapport } from '../../../shared/models/rapport';

import { Message,SelectItem } from 'primeng/primeng';

import { ColonneService } from '../../../service/colonne.service';
import { SharedService } from '../../../shared/services/shared.service';
@Component({
    moduleId: module.id,
    selector: 'add-internal-colonne',
    templateUrl: 'add-form.component.html'
})

export class AddColonneComponent implements OnInit {

    @Input() rapport : Rapport;
    
    msgs: Message[] = [];
    
    colonneform: FormGroup;
    
    submitted: boolean;
    
    genders: SelectItem[];
        
    description: string;

    colonne: InternalColonne = new InternalColonne();
    
    constructor(private fb: FormBuilder, private colonneService : ColonneService) {}
    
    ngOnInit() {
        this.colonneform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'type': new FormControl('', Validators.required),
            'displayName': new FormControl(''),
            "ordre": new FormControl(''),
            "filterType": new FormControl(''),
            "enableFiltering": new FormControl(''),
            "internalFilter": new FormControl(''),
            "selectOption": new FormControl(''),
            "dynamicOption": new FormControl(''),
            "dataOption": new FormControl(''),
            "depend": new FormControl(''),
        });
        
    }

    
    
    onSubmit(value: string) {
        this.submitted = true;
        this.colonne = this.colonneform.value;
        this.colonne.rapport = this.rapport;
        this.colonne.internalFilter = true;
        console.log(this.colonne);
        //push success feedback
         this.colonneService.add(this.colonne).subscribe(
                res => {
                    //push success feedback
                    this.msgs = [];
                    this.msgs.push({severity:'success', summary:'Colonne added', detail:'your colonne has been added with success'});
                },
                err =>{
                    //push error feedback
                    this.msgs = [];
                    this.msgs.push({severity:'error', summary:'Error', detail:err});
                });
        
        this.colonne = new InternalColonne();
        }

    
    
}