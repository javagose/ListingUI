import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers , RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Configuration } from "../configuration";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class GenericService /*<T>*/{

  actionUrl: string;
  headers: Headers;
  options: RequestOptions;
  http : Http;  
  configuration : Configuration;    
  constructor(private uri : string, private injector: Injector) {  
    this.http = injector.get(Http);
    this.configuration = injector.get(Configuration);
    this.actionUrl = this.configuration.ServerWithApiUrl + uri;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
  }

  //get all itemm
    public findAll() /*: Observable<T[]>*/ {        
        return this.http.get(this.actionUrl, this.options)
            .map((response: Response) =>  this.extractData(response))
            .catch(this.handleError);            
    }

    // get one item

    public findOne (id: number)  {
        return this.http.get(this.actionUrl + id, this.options)
            .map((response: Response) => this.extractData(response))
            .catch(this.handleError);
    }

    //add methode

    public add(itemName: any,) {
        return this.http.post(this.actionUrl, itemName, this.options)
            .map((response: Response) => this.extractData(response))
            .catch(this.handleError);
    }

    //delete methode

    public delete(id: number)  {
        return this.http.delete(this.actionUrl + id, this.options)
            .map((res : Response)=>{console.log(res);})
            .catch(this.handleError);
    }

     public update(itemToUpdate: any){        
        return this.http.put(this.actionUrl, itemToUpdate, this.options)
            .map((response: Response) => this.extractData(response))
            .catch(this.handleError);
    }

    //patch methode
    
    public patch(id:number, key: string, value:any, action?: string){
        let patchUrl = this.actionUrl;
        if (action != null){
            //if is an update of request
            patchUrl = patchUrl+id+"/"+action;
            console.log("requete patch",patchUrl);
        }
        else{
            //if is a simple update 
            patchUrl = patchUrl+id;
            console.log("simple patch",patchUrl);
        }
            
        return this.http.patch(patchUrl, {"key": key, "value": value}, this.options)
            .map((response: Response)=> this.extractData(response))
            .catch(this.handleError)
    }

    public findRapportColonnes (idRapport: number, isInternal : boolean)  {
        return this.http.get(this.actionUrl + idRapport +"/"+ isInternal, this.options)
            .map((response: Response) => this.extractData(response))
            .catch(this.handleError);
    }

     public handleError(error: Response) {
        // in a real world app, we would want to log somewhere external
        // instead of just logging it to the console
        console.error("Error: " + error);
        return Observable.throw(error.json().error || 'Server error');
    }

    //parse the response data into a JSON object.
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    
}
