import { Component, computed, inject } from '@angular/core';
import { AccountsService } from '../services/accounts-service';
import { AuthService } from '../services/auth-service';
import { AccOpeationService } from '../services/acc-opeation-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-balance',
  imports: [],
  templateUrl: './balance.html',
  styleUrl: './balance.css',
})
export class Balance {
  accountService = inject(AccountsService)
  router = inject(Router)
  authService = inject(AuthService)
  accOperationsService =inject(AccOpeationService)

  accounts = this.accountService.getAllAccounts()
  currentUser = computed(()=>this.accountService.getUserByLogin(this.authService.currentLogin()))

  deleteAccount(login:string){
    this.accOperationsService.deleteAccount(login)
  }
  openHistory(login:string){
    this.router.navigate(['history', login])
  }
}
