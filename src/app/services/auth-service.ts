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
  currentUser = signal('')
  userLogin = localStorage.getItem('currentUser')

  constructor(){
    if(this.userLogin){
      this.currentUser.set(this.userLogin)
    }
  }
  logIn(login:string, password:string){
    const exist = this.accounts().find(account=>account.login==login && account.password==password)
    if (exist){
      localStorage.setItem('currentUser', login)
      this.currentUser.set(login)
      return true
    }
    return false
    
  }
  logOut(){
    if(this.currentUser()){
      localStorage.removeItem('currentUser')
      this.currentUser.set('')
      this.router.navigate(['/balance'])
    }
  }
}
