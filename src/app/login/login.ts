import { Component, inject } from '@angular/core';
import { AccountsService } from '../services/accounts-service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  accountsService = inject(AccountsService)
  form = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })
  errorMessage = ''
  logIn(){
    if (this.form.valid){
        const login = this.form.value.login!
        const password = this.form.value.password!
        if (!this.accountsService.logIn(login, password)){
          this.errorMessage = 'Не верно введены данные'
        }else{
          this.errorMessage = ''
        }
    }
    this.form.reset()
  }
  
}
