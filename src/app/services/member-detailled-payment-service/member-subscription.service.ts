import { Injectable } from '@angular/core';
import { ApiConnService } from 'src/app/services/data-management/api/api-conn.service';

@Injectable({
  providedIn: 'root',
})
export class MemberSubscriptionService {
  constructor(private apiConnService: ApiConnService) {}

  endPoint: string = 'roya-payment-details';

  // the correct table name as we should use in live

  // endPoint: string = 'roya-member-detailled-payments';

  getAllPaymentsDetails() {
    return this.apiConnService.getData(`${this.endPoint}`);
  }

  getPopulatedPaymentDetails() {
    return this.apiConnService.getData(`${this.endPoint}?populate=*`);
  }

  getFilteredPaymentDetails(filter: string) {
    return this.apiConnService.getData(`${this.endPoint}?populate=*&${filter}`);
  }

  getPaymentDetailsById(id: number) {
    return this.apiConnService.getDataById(this.endPoint, id);
  }

  addPaymentDetails(data: any) {
    return this.apiConnService.addData(this.endPoint, data);
  }

  editpaymentDetails(id: number, data: any) {
    return this.apiConnService.updateData(this.endPoint, id, data);
  }

  deletePaymentDetails(id: number) {
    return this.apiConnService.deleteData(this.endPoint, id);
  }
}
