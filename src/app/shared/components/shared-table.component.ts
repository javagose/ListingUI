import { Component, OnInit, Input, Output, EventEmitter, OnChanges, Injector } from '@angular/core';

import {ConfirmationService} from 'primeng/primeng';
import { Message, MenuItem } from 'primeng/primeng';

import {GenericService} from '../../service/generic.service';
import {SharedService} from '../services/shared.service';
import {TableParams} from '../models/table-params';

@Component({
    moduleId: module.id,
    selector: 'qs-shared-table',
    templateUrl: 'shared-table.component.html',
    providers : [GenericService]
})

export class SharedTableComponent implements OnInit, OnChanges {

    @Input() data : any = [];

    @Output() showFormDialog = new EventEmitter<any>();

    @Input() parametres : any;
    // context menue items
    menuItems: MenuItem[];
    // feedBack colonne to display after an operation
    msgs: Message[] = [];
    //windows width 
    windowWidth : string;
    // keys 
    keys : any [] = [];
    //
    crudService : GenericService;
    //context Menue Item
    items : MenuItem[];
    //item 
    item : any;
    selectedItem : any;
    selectedItemId : any;

    constructor(private injector : Injector, private confirmationService : ConfirmationService) {  
     }
    // on Init
    ngOnInit() { 
        //maintains Table view width, this var will be binded to DataTable        
            this.windowWidth = (window.innerWidth-80) +"px";
            this.crudService = new GenericService(this.parametres.uri, this.injector);
             this.items = [
            {label: 'Delete', icon: 'fa-close', command: (event) => this.removeItem(this.selectedItem, this.selectedItemId)},
            {label: 'details', icon: 'fa-eye', command: (event) => this.removeItem(this.selectedItem, this.selectedItemId)}
            
        ]
    }
    //on change
    ngOnChanges(changes): void {
        console.log(this.data, this.data[0])
        if(this.data && this.data.length>0)
            this.keys = Object.keys(this.data[0]).map( key => {
                
                     return {
                         field: key,
                         header: key.slice(0, 1).toUpperCase() + 
                         key.replace(/_/g, ' ' ).slice(1),
                         width : this.assignWidth(typeof(this.data[0][key])),
                         filter : true,
                         type : typeof(this.data[0][key])
                }
            });
    }
      
      // event triggred on table field change
    handleChange(event, item?, field?){
        if(event.data){
            item = event.data;
            field = event.column.field;
            }
        // we need a patch here 
        //push error feedback
        this.msgs = [];
        this.msgs.push({severity:'Success', summary:'Update Success', detail:"message will be updated as soon as we implement patch in backend"});
        console.log("we need to patch this ", item[field]);
    }

    removeItem (item, index){
        this.item= item;
        this.confirmationService.confirm({
            message: 'Do you want to delete this item?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.crudService.delete(this.item.id).subscribe(
                    res => {
                        //push success feedback
                        this.data = this.data.filter((val,i) => i!=index);       
                        this.msgs = [];
                        this.msgs.push({severity:'success', summary:'Item deleted', detail:'your item has been deleted with success'});
                        },
                    err =>{
                        //push error feedback
                        this.msgs = [];
                        this.msgs.push({severity:'error', summary:'Error in Deleting', detail:err.code +" "+err.message});
                        });
                
                this.item = null;
            }
        });
    }

    showDialog(item?, index?){
        console.log(index);
        if(item){
            this.showFormDialog.emit({item : item, index : index});       
        }
        else{
            this.showFormDialog.emit(true);
        }    
    }

    assignWidth( type : string ){
        let width = "";
        console.log(typeof(this.data))
        switch(type){   
            case "number":         
                return width  = "100px";
            case "boolean":
                return width = "150px";  
            default :
                return width = "250px";
        }
    }

    //on context menue select
    onRowSelect(event){
        console.log(event.data);
        this.selectedItem= event.data; 
        this.selectedItemId= SharedService.arrayObjectIndexOf(this.data,this.selectedItem);
        console.log(this.selectedItemId);
    }

}