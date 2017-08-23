import { Injectable, Injector } from '@angular/core';
import { GenericService } from "./generic.service";
import { Rapport } from "../shared/models/rapport";
import { Http, Response, Headers , RequestOptions} from '@angular/http';
@Injectable()
export class RapportService extends GenericService{

  constructor(injector : Injector) { 
    
    super("rapports/", injector);
    
  }
  
}
