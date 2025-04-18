import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../sevice/account.service';

@Component({
  selector: 'app-cerate-update-account',
  templateUrl: './cerate-update-account.component.html',
  styleUrls: ['./cerate-update-account.component.scss']
})
export class CerateUpdateAccountComponent implements OnInit {
  @Input() user: any;
  @Input() userDialogeValue: boolean;
  @Output() userDialog = new EventEmitter<boolean>();
  @Output() UpdateData = new EventEmitter<boolean>();
  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    shippingAddress: [''],
    password: [''],
    phone: [''],
    rePassword: ['']
  });
showPassword: boolean = false;

  viewPassword: boolean = true;
  showPasswordErrorfild: boolean = false;
  passwordError: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setFormValues();
    this.viewPassword = this.user == null;

    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
  }

  handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.onClose();
  }

  onClose(): void {
    this.userDialog.emit(false);
  }

  setFormValues(): void {
    if (!this.user) return;
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.firstName,
      email: this.user.email,
      phone: this.user.phoneNumber,
      shippingAddress: this.user.shippingAddress
    });
  }

  saveUser(): void {
    if (!this.userForm.valid) return;

    const form = this.userForm.value;

    if (this.user) {
      const updateBody = {
        firstName: form.firstName,
        lastName: form.firstName,
        email: form.email,
        phone: form.phone,
        shippingAddress: form.shippingAddress
      };

      this.accountService.editUser(this.user.id, updateBody).subscribe({
        next: () => {
          this.showSuccess('User updated');
          this.emitAndClose();
        },
        error: err => console.error(err)
      });

    } else {
      if (form.password !== form.rePassword) {
        this.showPasswordError();
        return;
      }

      const createBody = {
        email: form.email,
        firstName: form.firstName,
        lastName: form.firstName,
        password: form.password,
        shippingAddress: form.shippingAddress,
        phone: form.phone
      };

      this.accountService.addUser(createBody).subscribe({
        next: () => {
           this.showSuccess('User created');
          this.emitAndClose();
        },
        error: err => console.error(err)
      });
    }
  }

  private emitAndClose(): void {
    this.UpdateData.emit(true);
    this.userDialog.emit(false);
    this.user = null;
  }

  private showSuccess(detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail,
      life: 3000
    });
  }

  private showError(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
      life: 3000
    });
  }

  private showPasswordError(): void {
    this.passwordError = `Passwords do not match. Password should be at least 8 characters and contain lowercase, uppercase, and non-alphanumeric characters.`;
    this.showPasswordErrorfild = true;
  }


generatePassword(): void {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '$%^&*()#@!';
  const all = upper + lower + numbers + symbols;
  const length = 8;

  let password = '';

  // Add at least one character from each category
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle the password to mix characters
  const shuffledPassword = this.shuffle(password);

  // Set the form values properly
  this.userForm.patchValue({
    password: shuffledPassword,
    rePassword: shuffledPassword
  });
}

shuffle(str: string): string {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}


}
