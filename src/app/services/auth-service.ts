import { signal, inject, Injectable, effect, computed } from '@angular/core';
import { AccountsService } from './accounts-service';
import { AccountsInterface } from '../interfaces/accounts-interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accountsService = inject(AccountsService)
  accounts = this.accountsService.getAllAccounts()
  
  currentUser = signal<AccountsInterface | null>(null)
  
  constructor(){
    this.currentUser.set(JSON.parse(localStorage.getItem('currentUser')||'null'))
  
    const updatedUser = computed(()=>{
      return this.accounts().find(account=>account.login == this.currentUser()?.login)
    })
    effect(()=>{
      if (updatedUser()){
        localStorage.setItem('currentUser', JSON.stringify(updatedUser()))
        this.currentUser.set(JSON.parse(localStorage.getItem('currentUser')||'null'))
      }
    })
  }

  logIn(login:string, password:string){
    const user = this.accounts().find(account=>account.login==login && account.password==password)
    if (user){      
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.currentUser.set(user)
      return true
    }
    return false
  }

  logOut(){
    if(this.currentUser()){
      localStorage.removeItem('currentUser')
      this.currentUser.set(null)
    }
  }
}
