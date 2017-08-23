import { Injectable, Injector } from '@angular/core';
import { GenericService } from "./generic.service";
import { Http, Response, Headers , RequestOptions} from '@angular/http';
@Injectable()
export class MessageService extends GenericService{

  constructor(injector : Injector) { 
    
    super("messages/", injector);
    
  }
  
}
