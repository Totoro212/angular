import { signal, inject, Injectable, computed,} from '@angular/core';
import { AccountsService } from './accounts-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accountsService = inject(AccountsService)
  accounts = computed(()=>this.accountsService.accounts())

  currentUserLogin = signal<string | null>(localStorage.getItem('currentUser'))
  currentUser = computed(()=> this.accounts().find(account => account.login == this.currentUserLogin()))

  logIn(login:string, password:string){
    const user = this.accounts().find(account=>account.login==login && account.password==password)
    if (user){     
      localStorage.setItem('currentUser', login)
      this.currentUserLogin.set(login)
      return true
    }
    return false
  }
  
  logOut(){
    localStorage.removeItem('currentUser')
    this.currentUserLogin.set(null)
  }
}
