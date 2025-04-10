import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Swiper } from 'swiper';
import { ShipmentsService } from './service/shipmentService/shipments.service';


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
  shipmentId: any;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private shipmentsService: ShipmentsService,
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

  getTheShipmentData() {
    // console.log(this.shipmentId);
    let token = localStorage.getItem('auth_token')
    if (token) {
      const loginTime = localStorage.getItem('loginTime');
      if (this.isSessionExpired(loginTime)) {
        console.log('Session expired - more than 2 hours passed');
        // this.renewToken(token)
        this.goLogin() // untill renew token function is completedd

      } else {
        console.log('Session still valid');
        this.checkShipmentOwner(this.shipmentId)

      }

    } else {
      this.goLogin()
    }




  }

  isSessionExpired(loginTime: any) {
    if (!loginTime) return true;

    const loginDateTime: number = new Date(loginTime).getTime();
    const currentTime: number = new Date().getTime();

    const timeDifference = currentTime - loginDateTime;

    const hoursDifference = timeDifference / (1000 * 60 * 60);

    return hoursDifference > 2;
  }


  renewToken(token: any) {
    this.authService.refreshToken()
  }

  checkShipmentOwner(id: any) {
    this.shipmentsService.checkShipmentNumber(id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res != null) {
          this.router.navigate(['/order-details'],
            { state: { data: res } });
          this.errorMessage = ''
        }
        else {
          console.log('forbidden request');
          this.errorMessage = `Forbidden Request >  Not Allowed`
          console.log(this.errorMessage);
        }

      },
      error: (err: any) => {
        this.errorMessage = `${err} >  Not Allowed`
        console.log(this.errorMessage);


      }
    })
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
