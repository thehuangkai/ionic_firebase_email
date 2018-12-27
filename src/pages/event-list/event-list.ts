import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";


@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  public eventList: Array<any>;

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider
  ) {}

  ionViewDidLoad() {
    this.eventProvider.getEventList().on("value", eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date
        });
        return false;
      });
    });
  }

  // Basically what is {}, did it pass the data over?
  goToEventDetail(eventId: string):void {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }

}
