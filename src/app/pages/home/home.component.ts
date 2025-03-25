import { Component, ViewChild, ElementRef } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('swiperContainer') swiperContainer: ElementRef | undefined;

  events: any[] = []; // Your events array
  serverUrl: string = 'your-server-url';

  constructor() { }

  onSlideChange(event: any) {
    // console.log('slide change', event);
  }

  getEvent(event: any) {
    // Handle event click
    console.log('event clicked', event);
  }

  ngAfterViewInit() {
    // You can access the Swiper instance here if needed
    const swiperInstance: Swiper = this.swiperContainer?.nativeElement.swiper;
  }
}
