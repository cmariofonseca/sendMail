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
        const DATA = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        return { id, ...DATA };
      }))
    );
  }

  listMessages() {
    return this.messages;
  }

  addMessage(message: Message) {
    this.messageCollection.add(message);
  }

  deleteMessage(message: Message) {
    this.messageDocument = this.af.doc<Message>(`messages/${message.id}`);
    /*
    *  El simbolo ${..} nos indica que haremos referencia a una variable,
    *  en este caso, messages es el objeto y message.id es el par clave-valor
    *  al que queremos apuntar, para poder eliminar
    */
    this.messageDocument.delete();
  }

}
