import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { AccountsService } from '../services/accounts-service';
@Component({
  selector: 'app-accounts',
  imports: [ReactiveFormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  private accountsService = inject(AccountsService)
  protected errorMessage = ''
  form = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  onSubmit(){
    if(this.form.valid){
      this.errorMessage = ''
      const login = this.form.value.login!
      const password = this.form.value.password!
      const firstname = this.form.value.firstname!
      const lastname = this.form.value.lastname!
      const newUser = this.accountsService.createAccount(login, password, firstname, lastname)
      if(!newUser) this.errorMessage = 'Данный пользователь занят'

      this.form.reset()
    }
    else{
      this.errorMessage = 'Заполните все поля минимум 3 символами'
    }
  }
}
