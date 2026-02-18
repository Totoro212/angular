import { Component, inject } from '@angular/core';
import { AccountsService } from '../services/accounts-service';
@Component({
  selector: 'app-balance',
  imports: [],
  templateUrl: './balance.html',
  styleUrl: './balance.css',
})
export class Balance {
  accountService = inject(AccountsService)
  accounts = this.accountService.getAllAccounts()
  currentUserLogin = this.accountService.currentUser
  currentUser = this.accountService.getUserByLogin(this.currentUserLogin())

  deleteAccount(login:string){
    this.accountService.deleteAccount(login)
  }
}
