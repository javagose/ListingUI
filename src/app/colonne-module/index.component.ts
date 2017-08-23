import { Component, OnInit } from '@angular/core';
//service provide observer to get route params
import { ActivatedRoute } from '@angular/router';

import { RapportService } from '../service/rapport.service';

import {Rapport} from '../shared/models/rapport';

@Component({
    moduleId: module.id,
    selector: 'index-colonne',
    templateUrl: 'index.component.html'
})

export class IndexComponent implements OnInit {

    idRapport : number;

    rapport : Rapport = new Rapport;

    constructor(private route: ActivatedRoute, private rapportService : RapportService) { }
    


    ngOnInit() {
        this.route.params.subscribe(params => {
                this.idRapport = +params['idRapport'];
                this.getRapport(+params['idRapport']); // (+) converts string 'id' to a number
            });
     }
     
    getRapport(idRapport : number){
        this.rapportService.findOne(idRapport).subscribe(
            res => {this.rapport = res; } 
        )
    }
}