import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {

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

}
