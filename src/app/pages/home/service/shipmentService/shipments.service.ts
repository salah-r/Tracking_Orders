import { Injectable } from '@angular/core';
import { ApiConnService } from 'src/app/services/data-management/api/api-conn.service';
@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  constructor(private apiConnService: ApiConnService) { }

  endPoint: string = 'api/shipments';



  getAllShipments() {
    return this.apiConnService.getData(`${this.endPoint}`);
  }

  checkShipmentNumber(trackingNumber: any, Token: any) {
    return this.apiConnService.fristGetData(`${this.endPoint}/track/${trackingNumber}`, Token);
  }

  addShipmentStatus(id: any, data: any) {
    return this.apiConnService.addData(`${this.endPoint}/${id}/status`, data);
  }
  cancelShipment(id: any, data: any) {
    return this.apiConnService.addData(`${this.endPoint}/${id}/cansel`, data);
  }

  getPopulatedShipments() {
    return this.apiConnService.getData(`${this.endPoint}?populate=*`);
  }

  getFilteredShipments(filter: string) {
    return this.apiConnService.getData(`${this.endPoint}?populate=*&${filter}`);
  }

  getShipmentById(id: number) {
    return this.apiConnService.getData(`${this.endPoint}/${id}`);
  }

  addShipment(data: any) {
    return this.apiConnService.addData(this.endPoint, data);
  }

  editShipment(id: number, data: any) {
    return this.apiConnService.updateData(this.endPoint, id, data);
  }

  deleteShipment(id: number) {
    return this.apiConnService.deleteData(this.endPoint, id);
  }
}
