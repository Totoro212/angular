import { inject, Injectable, signal } from '@angular/core';
import { AccountsInterface } from '../interfaces/accounts-interface';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  accounts = signal<AccountsInterface[]>([])
  router = inject(Router)
  data = localStorage.getItem('users')
  userLogin = localStorage.getItem('currentUser')
  currentUser = signal('')
  constructor(){
    if(this.userLogin){
      this.currentUser.set(this.userLogin)
    }
    if(this.data){
      this.accounts.set(JSON.parse(this.data))
    }
  }
  
  saveUserInLocalStorage(){
      localStorage.setItem('users', JSON.stringify(this.accounts()))
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
      this.saveUserInLocalStorage()
      return false
    }
    else{
      return true
    }
  }
  deleteAccount(login:string){
    this.accounts.update(accounts => accounts.filter(account => account.login != login))
    this.saveUserInLocalStorage()
  }


  logIn(login:string, password:string){
    const exist = this.accounts().find(account=>account.login==login && account.password==password)
    if (exist){
      localStorage.setItem('currentUser', login)
      this.currentUser.set(login)
      this.router.navigate(['/balance'])
      return true
    }
    else{
      return false
    }
  }
  logOut(){
    if(this.currentUser()){
      localStorage.removeItem('currentUser')
      this.currentUser.set('')
      this.router.navigate(['/balance'])
    }
  }

}
