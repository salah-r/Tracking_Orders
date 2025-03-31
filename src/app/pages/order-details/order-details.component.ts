import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  visible: boolean = false;
  shipmentData: any;
  currendNotes: any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: any };
    this.shipmentData = state?.data;
    console.log(this.shipmentData);

  }

  showDialog(data: any) {
    this.visible = true;
    this.currendNotes = data
  }

}
