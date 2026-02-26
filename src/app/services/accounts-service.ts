import { effect, Injectable, signal } from '@angular/core';
import { AccountsInterface } from '../interfaces/accounts-interface';
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  accounts = signal<AccountsInterface[]>(JSON.parse(localStorage.getItem('users')||'[]'))
 
  constructor(){
    effect(()=>localStorage.setItem('users', JSON.stringify(this.accounts())))
  }
  
  getAllAccounts(){ 
    return this.accounts  
  }

  deleteAccount(login:string){
    this.accounts.update(accounts => accounts.filter(account => account.login != login))
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

  changeUserBalance(login:string, sum:number, operation:boolean){
    this.accounts.update(accounts=>{
      return accounts.map(acc=>{
        if(acc.login == login && operation){
          return {...acc, balance:acc.balance+sum}
        }
        else if (acc.login ==login && !operation){
          return {...acc, balance:acc.balance-sum}
        }
        else{
          return acc
        }
      })
    })
  }
  
  deleteAccountOperations(operation:boolean, sum:number, login:string){
    this.accounts.update(accounts => {
      return accounts.map(account => {
        if(account.login == login && operation){
          return {...account, balance:account.balance-sum}
        }
        else if (account.login == login && !operation){
          return {...account, balance:account.balance+sum}
        }
        return account
      })
    })
  }

}
