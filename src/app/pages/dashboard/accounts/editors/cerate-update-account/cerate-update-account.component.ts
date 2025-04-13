import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../sevice/account.service';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-cerate-update-account',
  templateUrl: './cerate-update-account.component.html',
  styleUrls: ['./cerate-update-account.component.scss']
})
export class CerateUpdateAccountComponent {
  @Output() closeDialog = new EventEmitter<boolean>();
  @Input('user') user: any;
  @Input('userDialogeValue') userDialogeValue!: boolean;
  @Output('userDialog') userDialog = new EventEmitter<boolean>();
  @Output('UpdateData') UpdateData = new EventEmitter<boolean>();


  visible: boolean = true;  // Add this property
  diffrentPass: boolean;
  viewPass: boolean = true;
  passwordError: string = '';
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.setFormValues();
    if (this.user != null) {
      this.viewPass = false
    }

    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
  }

  handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }

  onClose() {
    this.visible = false;
    this.userDialog.emit(false);
  }



  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['',],
    email: ['', Validators.required],
    shippingAddress: ['',],
    password: ['',],
    phone: ['',],
    rePassword: ['',]
  });

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get shippingAddress() {
    return this.userForm.get('shippingAddress');
  }
  get password() {
    return this.userForm.get('password');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get rePassword() {
    return this.userForm.get('rePassword');
  }

  setFormValues() {

    this.userForm.patchValue({
      // password: this.user?.password || '',
      shippingAddress: this.user?.shippingAddress || '',
      email: this.user?.email || '',
      firstName: this.user?.firstName || '',
      phone: this.user?.phoneNumber || '',
      lastName: this.user?.lastName || '',
    });
  }

  saveUser() {
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      const cerateBody = {
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.firstName.value,
        password: this.password.value,
        shippingAddress: this.shippingAddress.value,
        phone: this.phone.value
      };
      if (this.user != null) {
        this.viewPass = false

        const editBody = {

          firstName: this.firstName.value,
          lastName: this.firstName.value,
          email: this.email.value,
          phone: this.phone.value,
          shippingAddress: this.shippingAddress.value

        };
        // update func
        this.accountService.editUser(this.user.id, editBody).subscribe({
          next: (res) => {
            console.log(res);

            this.UpdateData.emit(true);
            this.userDialog.emit(false);
            this.userDialogeValue = false;

            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'user Updated',
              life: 3000,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });

        // add func
      } else {
        this.viewPass = false

        if (this.password.value === this.rePassword.value) {

          this.accountService.addUser(cerateBody).subscribe({
            next: (res: any) => {
              console.log(res.data);
              this.UpdateData.emit(true);
              this.userDialog.emit(false);
              this.userDialogeValue = false;

              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'user Created',
                life: 3000,
              });
            },
            error: (err) => {
              console.log(err),
                this.passwordError = 'Password should be at least 8 digits and should contains Lowercase, NonAlphanumeric and Uppercase'

            }
          });
        } else {
          this.diffrentPass = true
        }
      }

      this.user = null;
    }
  }
}
