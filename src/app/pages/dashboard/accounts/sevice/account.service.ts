import { Injectable } from '@angular/core';
import { ApiConnService } from 'src/app/services/data-management/api/api-conn.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private apiService: ApiConnService) { }

  endPoint: string = 'api/users';

  getAllUsersForFristOne(Token: any) {
    return this.apiService.fristGetData(`${this.endPoint}`, Token);
  }
  getAllUsers() {
    return this.apiService.getData(`${this.endPoint}`);
  }

  getPopulatedUsers() {
    return this.apiService.getData(`${this.endPoint}?populate=*`);
  }

  getFilteredUsers(filter: string) {
    return this.apiService.getData(`${this.endPoint}?populate=*&${filter}`);
  }

  getUserById(id: number) {
    return this.apiService.getDataById(this.endPoint, id);
  }

  addUser(data: any) {
    return this.apiService.addData(this.endPoint, data);
  }

  editUser(id: number, data: any) {
    return this.apiService.updateData(this.endPoint, id, data);
  }

  deleteUser(id: number, data: any) {
    return this.apiService.deleteUser(this.endPoint, id, data);
  }
}
