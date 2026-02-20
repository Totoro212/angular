import { signal, inject, Injectable } from '@angular/core';
import { AccountsService } from './accounts-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router)
  accountsService = inject(AccountsService)
  accounts = this.accountsService.getAllAccounts()

  currentLogin = signal('')

  constructor(){
    this.currentLogin.set(localStorage.getItem('currentUser') || '')
  }

  logIn(login:string, password:string){
    const exist = this.accounts().find(account=>account.login==login && account.password==password)
    if (exist){
      localStorage.setItem('currentUser', login)
      this.currentLogin.set(login)
      return true
    }
    return false
  }

  logOut(){
    if(this.currentLogin()){
      localStorage.removeItem('currentUser')
      this.currentLogin.set('')
    }
  }
}
