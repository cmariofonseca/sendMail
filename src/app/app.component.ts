import { Message } from './models/message';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ConnectionService } from './services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  mess: any = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  messages: Observable<Message[]>;

  constructor(private cs: ConnectionService) {
    this.messages = this.cs.listMessages();
  }

  addition(message: Message) {
    this.cs.addMessage(this.mess);
    this.mess.name = '';
    this.mess.phone = '';
    this.mess.email = '';
    this.mess.message = '';
    // Reestable valores vacios al formulario
  }

  delete(message: Message) {
    this.cs.deleteMessage(message);
  }

}
