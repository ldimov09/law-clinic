import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private service: AuthService) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }

  handleLogin(form: FormGroup) {
    this.service.loginUser(form.value).subscribe({
      next: (response: any) => {
        if (!response.success) {
          console.log(response.error);
        } else {
          const token = response.result;
          localStorage.setItem('token', token);
        }
      },
    });
  }

  getuserdata(){
    console.log(this.service.user)
  }
}
