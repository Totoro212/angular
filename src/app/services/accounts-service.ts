import { effect, Injectable, signal } from '@angular/core';
import { AccountsInterface } from '../interfaces/accounts-interface';
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  accounts = signal<AccountsInterface[]>([])
  data = localStorage.getItem('users')

  constructor(){
    if(this.data){
      this.accounts.set(JSON.parse(this.data))
    }
    effect(()=>localStorage.setItem('users', JSON.stringify(this.accounts())))
  }
  
  getAllAccounts(){
    return this.accounts
  }
  getUserByLogin(login:string){
    return this.accounts().find(acc=>acc.login == login)
  }
  createAccount(login:string, password:string, firstname:string, lastname:string){
    const exist = this.accounts().find(acc => acc.login == login)
    if(!exist)
    {
      const newAccount:AccountsInterface = {
        login,
        password, 
        firstname, 
        lastname, 
        balance:0
      }
      this.accounts.update(accounts => [...accounts, newAccount])
      return false
    }
    return true
  }
}
