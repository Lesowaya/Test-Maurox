import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import * as operators from 'rxjs/operators';

export interface Item {
    _id: string;
    name: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  name: string;
  items: Item[];

  constructor(public navCtrl: NavController, public userService: UserServiceProvider ) {
    this.getMessages();
  
  }
  
  getMessages() {
    this.userService.getAllMessages()
        .subscribe((items: Item[]) =>  this.items = items);
  }

  delRowWithId(id) {
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

  addToDb(){
      this.userService.postMessage(this.name).pipe(operators.mergeMap(() => this.userService.getAllMessages()))
          .subscribe((items: Item[]) => {
            this.items = items;
            this.name = '';
        });
  }
}
