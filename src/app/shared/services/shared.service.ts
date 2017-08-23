import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

    // takes an array of object and an object and return the index of the object in array
    static arrayObjectIndexOf(objectList:any, object:any) :number {
            for(var i = 0, len = objectList.length; i < len; i++) {
                if (objectList[i].id == object.id) return i;      
            }
            return -1;
        }

     // clone event data in object model
    static cloneItem(m: any): any {
        let message = new Object();
        for(let prop in m) {
            message[prop] = m[prop];
        }
        return message;
    }

}