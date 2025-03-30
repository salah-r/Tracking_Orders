import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
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
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkIfLogin()

  }


  checkIfLogin() {
    let Token = localStorage.getItem("auth_token")
    if (Token) {

      this.isLoggedIn = true

    }
  }

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

  goLogin() {
    this.router.navigate(['/signin'])
  }
}
