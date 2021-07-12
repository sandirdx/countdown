import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  launchName: any;
  constructor() {}

  private subscription!: Subscription;
  launchDetails: any;

  public dateNow = new Date();
  public dDay: any;
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private pad(x: any) {
    return x < 10 ? '0' + x : x;
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = this.pad(
      Math.floor(
        (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
      )
    );
    this.minutesToDday = this.pad(
      Math.floor(
        (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
          this.SecondsInAMinute
      )
    );
    this.hoursToDday = this.pad(
      Math.floor(
        (timeDifference /
          (this.milliSecondsInASecond *
            this.minutesInAnHour *
            this.SecondsInAMinute)) %
          this.hoursInADay
      )
    );
    this.daysToDday = this.pad(
      Math.floor(
        timeDifference /
          (this.milliSecondsInASecond *
            this.minutesInAnHour *
            this.SecondsInAMinute *
            this.hoursInADay)
      )
    );
  }

  ngOnInit() {
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });

    this.launchDetails = localStorage.getItem('launchDetails');
    this.launchDetails = JSON.parse(this.launchDetails);
    this.dDay = new Date(this.launchDetails.launchDate);
    this.launchName = this.launchDetails.launchName;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
