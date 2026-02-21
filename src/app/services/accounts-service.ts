import { effect, Injectable, signal } from '@angular/core';
import { AccountsInterface } from '../interfaces/accounts-interface';
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  accounts = signal<AccountsInterface[]>([])
 
  constructor(){
    this.accounts.set(JSON.parse(localStorage.getItem('users')||'[]'))
    effect(()=>localStorage.setItem('users', JSON.stringify(this.accounts())))
  }
  
  getAllAccounts(){ 
    return this.accounts  
  }

  createAccount(login:string, password:string, firstname:string, lastname:string){
    const newAccount:AccountsInterface = {
        login,
        password, 
        firstname, 
        lastname, 
        balance:0
    }
    if(this.accounts().find(acc => acc.login == login))
    {
      return false
    }
    else{
      this.accounts.update(accounts => [...accounts, newAccount])
      return true
    }
  }
}
