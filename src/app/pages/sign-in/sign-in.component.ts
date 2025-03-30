import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  showForgetPassword = false;
  verificationInputs: string[] = Array(6).fill('');
  fullVerificationCode: string = '';
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {


  }
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
  moveToNext(event: any, currentIndex: number) {
    const input = event.target;
    const value = input.value;

    // Store the current input value
    this.verificationInputs[currentIndex] = value;

    // Move to next input if a digit is entered
    if (value.length === 1 && currentIndex < 5) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Check if this is the last input
    if (currentIndex === 5 && value.length === 1) {
      // Combine all inputs into a single number
      this.fullVerificationCode = this.verificationInputs.join('');

      // Optional: Perform verification
      this.verifyCode();
    }
  }

  verifyCode() {
    console.log('Full Verification Code:', this.fullVerificationCode);



  }

  onKeyDown(event: KeyboardEvent, currentIndex: number) {
    // console.log(event);

    if (event.key == 'Backspace' && currentIndex > 0) {
      const inputs = document.querySelectorAll('input');
      if (inputs[currentIndex].value == '') {
        inputs[currentIndex - 1].focus();
      }
    }
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);

          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loginError = 'فشل تسجيل الدخول. الرجاء التحقق من اسم المستخدم وكلمة المرور.';
          console.error('Login error:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  onResetPassword(): void {
    // if (this.resetPasswordForm.valid) {
    //   const { newPassword } = this.resetPasswordForm.value;

    //   this.authService.resetPassword(newPassword).subscribe({
    //     next: (response) => {
    //       // Handle successful password reset
    //       this.showForgetPassword = false;
    //       this.loginForm.reset();
    //       // Show success message
    //     },
    //     error: (error) => {
    //       // Handle password reset error
    //       console.error('Password reset error:', error);
    //     }
    //   });
    // } else {
    //   this.resetPasswordForm.markAllAsTouched();
    // }
  }
}
