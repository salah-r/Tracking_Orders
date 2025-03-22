import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  showForgetPassword = false;
  verificationInputs: string[] = Array(6).fill('');
  fullVerificationCode: string = '';

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
    // Add your verification logic here
    // For example:
    // this.authService.verifyCode(this.fullVerificationCode)
  }

  // Optional: Method to handle backspace for better UX
  onKeyDown(event: KeyboardEvent, currentIndex: number) {
    // console.log(event);

    if (event.key == 'Backspace' && currentIndex > 0) {
      const inputs = document.querySelectorAll('input');
      if (inputs[currentIndex].value == '') {
        inputs[currentIndex - 1].focus();
      }
    }
  }

}
