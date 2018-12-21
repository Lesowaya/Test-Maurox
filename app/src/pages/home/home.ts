import { Component, OnInit } from '@angular/core';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as operators from 'rxjs/operators';

export interface Item {
  _id: string;
  name: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  
  name: string;
  items: Item[];
  
  constructor(public userService: UserServiceProvider) {
  }
  
  ngOnInit() {
    this.getMessages();
  }
  
  getMessages() {
    this.userService.getAllMessages()
      .subscribe((items: Item[]) => this.items = items);
  }
  
  deleteMessage(id) {
    this.userService.delOneMessage(id).pipe(operators.mergeMap(() => this.userService.getAllMessages()))
      .subscribe((items: Item[]) => {
        this.items = items;
        this.name = '';
      });
  }
  
  deleteAllMessages() {
    this.userService.delAllMessages().pipe(operators.mergeMap(() => this.userService.getAllMessages()))
      .subscribe((items: Item[]) => {
        this.items = items;
        this.name = '';
      });
  }
  
  addMessage() {
    this.userService.postMessage(this.name).pipe(operators.mergeMap(() => this.userService.getAllMessages()))
      .subscribe((items: Item[]) => {
        this.items = items;
        this.name = '';
      });
  }
}
