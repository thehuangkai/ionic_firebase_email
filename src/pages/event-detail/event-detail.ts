import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";

@IonicPage({
  segment: "event-detail/:eventId"
})
@Component({
  selector: "page-event-detail",
  templateUrl: "event-detail.html"
})
export class EventDetailPage {
  public currentEvent: any = {};

  // notice navparams is needed here
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider
  ) {}

  // key is here, ionViewDidLoad then already get the information liao.
  ionViewDidLoad() {
    this.eventProvider
      .getEventDetail(this.navParams.get("eventId"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

}