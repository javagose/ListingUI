import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = 'https://localhost:12444/';
    public ApiUrl: string = 'rest/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
    //public ServerWithApiUrl = "https://jsonplaceholder.typicode.com/posts";
}