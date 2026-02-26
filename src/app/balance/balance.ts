import { Component, computed, inject } from '@angular/core';
import { AccountsService } from '../services/accounts-service';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { OperationsService } from '../services/operations-service';
@Component({
  selector: 'app-balance',
  imports: [],
  templateUrl: './balance.html',
  styleUrl: './balance.css',
})
export class Balance {
  private router = inject(Router)
  private accountService = inject(AccountsService)
  private authService = inject(AuthService)
  private operationsService = inject(OperationsService)

  protected accounts = computed(()=>this.accountService.accounts())
  protected currentUser = computed(()=>this.authService.currentUser())


  deleteAccount(login:string){
    this.accountService.deleteAccount(login)
    this.operationsService.deleteAllAccountOperations(login)
  }

  openHistory(login:string){
    this.router.navigate(['/history', login])
  }
}
