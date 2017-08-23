import { Injectable, Injector } from '@angular/core';
import { GenericService } from "./generic.service";
import { Colonne } from "../shared/models/colonne";
import { Http, Response, Headers , RequestOptions} from '@angular/http';
@Injectable()
export class ColonneService extends GenericService{

  constructor(injector : Injector) { 
    
    super("colonnes/", injector);
    
  }
   
  
}
