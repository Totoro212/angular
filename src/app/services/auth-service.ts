import { signal, inject, Injectable, linkedSignal } from '@angular/core';
import { AccountsService } from './accounts-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accountsService = inject(AccountsService)
  accounts = this.accountsService.getAllAccounts()

  currentUserLogin = signal(localStorage.getItem('currentUser')||'null')
  currentUser = linkedSignal({
    source: this.currentUserLogin,
    computation: (acc) => this.accounts().find(account => account.login==acc) ?? null
  })
  constructor(){
    console.log(this.currentUser())
  }

  logIn(login:string, password:string){
    const user = this.accounts().find(account=>account.login==login && account.password==password)
    if (user){     
      this.currentUser.set(user)
      localStorage.setItem('currentUser', login)
      return true
    }
    return false
  }
  
  logOut(){
    this.currentUser.set(null)
    localStorage.removeItem('currentUser')
  }
}
