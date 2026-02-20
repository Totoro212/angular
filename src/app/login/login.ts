import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService)
  router = inject(Router)
  form = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })
  errorMessage = ''

  logIn(){
    if (this.form.valid){
        const login = this.form.value.login!
        const password = this.form.value.password!
        if (!this.authService.logIn(login, password)){
          this.errorMessage = 'Не верно введены данные'
        }else{
          this.errorMessage = ''
          this.router.navigate(['/balance'])
        }
    }
    this.form.reset()
  }
}
