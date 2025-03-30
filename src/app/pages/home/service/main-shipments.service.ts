import { Injectable } from '@angular/core';
import { ApiConnService } from 'src/app/services/data-management/api/api-conn.service';
@Injectable({
  providedIn: 'root'
})
export class MainShipmentsService {
  constructor(private apiConnService: ApiConnService) { }

  endPoint: string = 'MainShipment';



  getAllMainShipments() {
    return this.apiConnService.getData(`${this.endPoint}`);
  }

  getPopulatedMainShipments() {
    return this.apiConnService.getData(`${this.endPoint}?populate=*`);
  }

  getFilteredMainShipments(filter: string) {
    return this.apiConnService.getData(`${this.endPoint}?populate=*&${filter}`);
  }

  getMainShipmentById(id: number) {
    return this.apiConnService.getDataById(this.endPoint, id);
  }

  addMainShipment(data: any) {
    return this.apiConnService.addData(this.endPoint, data);
  }

  editMainShipment(id: number, data: any) {
    return this.apiConnService.updateData(this.endPoint, id, data);
  }

  deleteMainShipment(id: number) {
    return this.apiConnService.deleteData(this.endPoint, id);
  }
}
