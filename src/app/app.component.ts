import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Message } from './models/message';
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

  editMess: any = {
    id: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  messages: Observable<Message[]>;

  constructor(private cs: ConnectionService) {
    this.messages = this.cs.listMessages();
  }

  addition() {
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

  edition(message: Message) {
    this.editMess.id = message.id;
    // Se define a cual documento particular se hará los cambios
    this.cs.editMessage(this.editMess);
  }

}
