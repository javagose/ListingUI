import { Component, OnInit } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import  { Rapport } from '../../../shared/models/rapport';

import { Message,SelectItem } from 'primeng/primeng';

import { RapportService } from '../../../service/rapport.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
    moduleId: module.id,
    selector: 'add-rapport',
    templateUrl: 'add-form.component.html'
})

export class AddRapportComponent implements OnInit {
    
    msgs: Message[] = [];
    
    rapportform: FormGroup;
    
    submitted: boolean;
    
    genders: SelectItem[];
        
    description: string;

    rapport: Rapport = new Rapport();
    
    constructor(private fb: FormBuilder, private rapportService : RapportService) {}
    
    ngOnInit() {
        this.rapportform = this.fb.group({
            'nom': new FormControl('', Validators.required),
            'typeRapport': new FormControl('', Validators.required),
            'description': new FormControl(''),
            'requete': new FormControl(''),
            'enableFiltring': new FormControl(''),
            'enableLimitFiltring': new FormControl(''),
            'sorting': new FormControl(''),
            'pagination': new FormControl(''),
            'enableGridMenu': new FormControl(''),
            'enableGrouping': new FormControl(''),
            'exporterMenuXls': new FormControl(''),
            'exporterMenuPdf': new FormControl(''),
            'exporterMenuCsv': new FormControl(''),
            'exporterMenuAllData': new FormControl(''),
            'exporterMenuVisisbleData': new FormControl(''),
        });
        
    }
    
    onSubmit(value: string) {
        this.submitted = true;
        this.rapport = this.rapportform.value;
        console.log(this.rapport);
        //push success feedback
         this.rapportService.add(this.rapport).subscribe(
                res => {
                    //push success feedback
                    this.msgs = [];
                    this.msgs.push({severity:'success', summary:'Rapport added', detail:'your rapport has been added with success'});
                },
                err =>{
                    //push error feedback
                    this.msgs = [];
                    this.msgs.push({severity:'error', summary:'Error', detail:err});
                });
        
        this.rapport = new Rapport();
        }

    
    
}