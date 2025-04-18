import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountService } from '../../sevice/account.service';

@Component({
  selector: 'app-view-all-accounts',
  templateUrl: './view-all-accounts.component.html',
  styleUrls: ['./view-all-accounts.component.scss']
})
export class ViewAllAccountsComponent implements OnInit {
  @ViewChild('dt') dt: Table;

  users: any[] = [];
  filteredUsers: any[] = [];
  user: any = null;
  filterMethod: string = 'Email';
  accountDialogVisible: boolean = false;

  filtersList: any[] = [
    { label: 'البريد الالكتروني', value: 'Email' },
    { label: 'اسم المستخدم', value: 'Name' },
    { label: 'رقم الهاتف', value: 'Phone' }
  ];

  private token: string = localStorage.getItem('auth_token') || '';

  constructor(
    private accountService: AccountService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  // جلب جميع المستخدمين من الخدمة
  getAllUsers(): void {
    this.accountService.getAllUsersForFristOne(this.token).subscribe({
      next: (response) => {
        this.users = response;
        this.filteredUsers = [...this.users];
      },
      error: (err) => console.error(err)
    });
  }

  getUserID(event: any): void {
    this.filterMethod = event.value;
  }

  onUsersFiter(event: any): void {
    const value = event.target.value.toLowerCase();

    if (!value) {
      this.filteredUsers = [...this.users];
      return;
    }

    switch (this.filterMethod) {
      case 'Email':
        this.filteredUsers = this.users.filter(u => u.email?.toLowerCase().includes(value));
        break;
      case 'Name':
        this.filteredUsers = this.users.filter(u => u.firstName?.toLowerCase().includes(value));
        break;
      case 'Phone':
        this.filteredUsers = this.users.filter(u => u.phoneNumber?.includes(value));
        break;
    }
  }


  openNewUserDialog(): void {
    this.user = null;
    this.accountDialogVisible = true;
  }


  editUser(user: any): void {
    this.user = { ...user };
    this.accountDialogVisible = true;
  }


  deleteUser(user: any): void {
    this.confirmationService.confirm({
      message: `هل متأكد من مسح العضو ${user.firstName}؟`,
      header: 'مسح',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.deleteUser(user.id, {}).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم مسح العضو',
              life: 3000,
            });
            this.getAllUsers();
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  onDialogClose(): void {
    this.accountDialogVisible = false;
  }


  onUserDataUpdated(refresh: boolean): void {
    if (refresh) {
      this.getAllUsers();
    }
  }

    changeDialogStatus(isVisible: boolean): void {
    this.accountDialogVisible = isVisible;
  }

   UpdateOwnerData(updatedData: any) {
    if (updatedData == true) {
      this.getAllUsers();
    }
  }
}
