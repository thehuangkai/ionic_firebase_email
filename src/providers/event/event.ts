import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable()
export class EventProvider {

  public eventListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        // a reference, and probably gets it if not created already
        this.eventListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventCost: number
  ): firebase.database.ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1
    });
  }

  // self explainatory
  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }

 
  getEventDetail(eventId:string): firebase.database.Reference {
    return this.eventListRef.child(eventId);
  }

}
