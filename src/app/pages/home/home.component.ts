import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Swiper } from 'swiper';
import { ShipmentsService } from './service/shipmentService/shipments.service';
import { RevokeToken } from 'src/app/interfaces/login-credentials';

import { ConfirmationService, MessageService } from 'primeng/api';

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
  errorMessage: string = '';
  revokeToken: RevokeToken;
  token: string;
  isHovered = false;
  isTextHovered = false;
  isAirTextHovered: boolean = false;
  visible: boolean = false
  airVisible: boolean = false;
  seaVisible: boolean = false;
  landVisible: boolean = false;

  showDialog(type: any) {

    this.airVisible = false;
    this.seaVisible = false;
    this.landVisible = false;


    this.visible = true
    if (type == 'sea') {
      this.seaVisible = true;

    }
    else if (type == 'air') {
      this.airVisible = true
    }
    else {
      this.landVisible = true
    }
  }

  constructor(
    private authService: AuthService,
    private shipmentsService: ShipmentsService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkIfLogin()

  }


  toggleImages(hovered: boolean): void {
    this.isHovered = hovered;
  }

  toggleText(hovered: boolean): void {
    this.isTextHovered = hovered;
  }

  toggleTextAir(hovered: boolean): void {
    this.isAirTextHovered = hovered;
  }

  checkIfLogin() {
    this.token = localStorage.getItem("auth_token")
    if (this.token) {
      this.isLoggedIn = true
    }
  }


  goLogOut() {
    localStorage.clear()
    this.router.navigate(['/signin'])
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
    this.shipmentsService.checkShipmentNumber(id, this.token).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('ExtraShipment', JSON.stringify(res))

        if (res != null) {
          this.router.navigate(['/order-details'],
            { state: { data: res } });
          this.errorMessage = ''
        }
        else {
          console.log('forbidden request');
          this.errorMessage = `Forbidden Request >  Not Allowed`
          // console.log(this.errorMessage);
          this.confirm1();
        }

      },
      error: (err: any) => {
        this.errorMessage = `${err} >  Not Allowed`
        // console.log(this.errorMessage);
        this.confirm1();


      }
    })
  }


  confirm1() {
    this.confirmationService.confirm({
      message: this.errorMessage || 'Authorization Error',
      header: 'Error',
      icon: 'pi pi-danger',
      acceptLabel: 'Try Again',
      rejectVisible: false,
      accept: () => {
        this.shipmentId == null
        this.errorMessage = '';
      }
    });
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

  // logOut(): void {
  //   debugger;
  //   const token = localStorage.getItem("auth_token");
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   debugger;
  //   if (token && refreshToken) {
  //     const revokeToken: RevokeToken = {
  //       token,
  //       refreshToken
  //     };

  //     this.authService.Logout(revokeToken).subscribe({
  //       next: () => {
  //         localStorage.clear();
  //         this.router.navigate(['/']);
  //       },
  //       error: (err) => {
  //         console.error('Logout failed:', err);
  //         // Still clear storage & navigate if logout fails (optional)
  //         localStorage.clear();
  //         this.router.navigate(['/']);
  //       }
  //     });
  //   }
  // }

}
