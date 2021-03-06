import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {

  private messageDocument: AngularFirestoreDocument<Message>;
  private messageCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;

  constructor(private af: AngularFirestore) {
    this.messageCollection = af.collection<Message>('messages');
    this.messages = this.messageCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listMessages() {
    return this.messages;
  }

  addMessage(message: Message) {
    this.messageCollection.add(message);
  }

  deleteMessage(message) {
    this.messageDocument = this.af.doc<Message>(`messages/${message.id}`);
    /*
    *  El simbolo ${..} nos indica que haremos referencia a una variable,
    *  en este caso, messages es el objeto y message.id es el par clave-valor
    *  al que queremos apuntar, para poder eliminar
    */
    this.messageDocument.delete();
  }

  editMessage(message: Message) {
    this.messageDocument = this.af.doc<Message>(`messages/${message.id}`);
    this.messageDocument.update(message);
    console.log('id: ' + message.id, 'name: ' + message.name);
  }

}
