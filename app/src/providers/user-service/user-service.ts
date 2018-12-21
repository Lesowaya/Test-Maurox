import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  constructor(private http: HttpClient) {
  };
  
  getAllMessages() {
    return this.http.get('list');
  };

  delOneMessage(id) {
    return this.http.delete('delete/' + id);
  };

  delAllMessages() {
    return this.http.delete('delete-all');
  };

  postMessage(message){
    return this.http.post('create', {name: message});
  };


}




