// import { Injectable } from '@angular/core';
// import { ApiConnService } from 'src/app/services/data-management/api/api-conn.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ShipmentService {
//   private shipmentData: any;

//   constructor(private apiService: ApiConnService) { }

//   endPoint: string = 'api/MainShipment';

//   getAllMainShipments() {
//     return this.apiService.getData(`${this.endPoint}`);
//   }

//   getPopulatedMainShipments() {
//     return this.apiService.getData(`${this.endPoint}?populate=*`);
//   }

//   getFilteredMainShipments(filter: string) {
//     return this.apiService.getData(`${this.endPoint}?populate=*&${filter}`);
//   }

//   getMainShipmentById(id: number) {
//     return this.apiService.getDataById(this.endPoint, id);
//   }

//   addMainShipment(data: any) {
//     return this.apiService.addData(this.endPoint, data);
//   }
//   addExtraShipment(data: any, id: any) {
//     return this.apiService.addData(`api/shipments?mainShipmentId=${id}`, data);
//   }


//   editMainShipment(id: number, data: any) {
//     return this.apiService.updateMainShipmentData(this.endPoint, id, data);
//   }


//   updateStatus(id: number, data: any) {
//     return this.apiService.upadteMainShipmentStatus(this.endPoint, id, data);
//   }

//   deleteMainShipment(id: number, data: any) {
//     return this.apiService.deleteMainShipment(this.endPoint, id, data);
//   }
//   deleteExtraShipment(id: number, cancelReason: any, data: any) {
//     return this.apiService.deleteExtraShipment('api/shipments', id, cancelReason, data);
//   }


//   setShipmentData(data: any) {
//     this.shipmentData = data;
//   }

//   getShipmentData() {
//     return this.shipmentData;
//   }

//   checkShipmentNumber(trackingNumber: any) {
//     return this.apiService.getData(`shipments/track/${trackingNumber}`);
//   }


// }



import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiConnService } from 'src/app/services/data-management/api/api-conn.service';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private shipmentDataSubject = new BehaviorSubject<any>(null); // Replace `any` with your actual model type

  constructor(private apiService: ApiConnService) { }

  endPoint: string = 'api/MainShipment';

  // ================== API Calls ==================
  getAllMainShipments() {
    return this.apiService.getData(`${this.endPoint}`);
  }

  getPopulatedMainShipments() {
    return this.apiService.getData(`${this.endPoint}?populate=*`);
  }

  getFilteredMainShipments(filter: string) {
    return this.apiService.getData(`${this.endPoint}?populate=*&${filter}`);
  }

  getMainShipmentById(id: number) {
    return this.apiService.getDataById(this.endPoint, id);
  }

  addMainShipment(data: any) {
    return this.apiService.addData(this.endPoint, data);
  }

  addExtraShipment(data: any, id: any) {
    return this.apiService.addData(`api/shipments?mainShipmentId=${id}`, data);
  }

  editMainShipment(id: number, data: any) {
    return this.apiService.updateMainShipmentData(this.endPoint, id, data);
  }
  editExtraShipment(id: number, data: any) {
    return this.apiService.updateExtraShipmentData("api/shipments", id, data);
  }

  updateStatus(id: number, data: any) {
    return this.apiService.upadteMainShipmentStatus(this.endPoint, id, data);
  }
  updateExstraStatus(id: number, data: any) {
    return this.apiService.upadteMainShipmentStatus("api/shipments", id, data);
  }
  updateMainShipmentStatus(id: number, data: any) {
    return this.apiService.upadteMainShipmentStatus2(this.endPoint, id, data);
  }

  deleteMainShipment(id: number, data: any) {
    return this.apiService.deleteMainShipment(this.endPoint, id, data);
  }

  deleteExtraShipment(id: number, cancelReason: any, data: any) {
    return this.apiService.deleteExtraShipment('api/shipments', id, cancelReason, data);
  }

  checkShipmentNumber(trackingNumber: any) {
    return this.apiService.getData(`shipments/track/${trackingNumber}`);
  }

  // ================== BehaviorSubject Logic ==================

  /**
   * Set shipment data
   * @param data - The shipment data to emit
   */
  setShipmentData(data: any) {
    this.shipmentDataSubject.next(data);
  }

  /**
   * Get observable to subscribe to shipment data changes
   */
  getShipmentData() {
    return this.shipmentDataSubject.asObservable();
  }

  /**
   * Optional: Get current value without subscribing
   */
  getCurrentShipmentData() {
    return this.shipmentDataSubject.value;
  }


}
