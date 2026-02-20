import { Component, inject, computed } from '@angular/core';
import { OperationsService } from '../services/operations-service';
import { AccountsService } from '../services/accounts-service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth-service';
import { AccOpeationService } from '../services/acc-opeation-service';
@Component({
  selector: 'app-history-operations',
  imports: [DatePipe],
  templateUrl: './history-operations.html',
  styleUrl: './history-operations.css',
})
export class HistoryOperations {
  authService = inject(AuthService)
  operationsService = inject(OperationsService)
  accOpeationService = inject(AccOpeationService)
  accountsService = inject(AccountsService)
  
  operations = this.operationsService.getAllOperations()
  currentUser = computed(()=>this.accountsService.getUserByLogin(this.authService.currentLogin()))
  
  deleteOperation(id:number, operation:boolean, sum:number, login:string){
    this.accOpeationService.deleteOperation(id, operation, sum, login)
  }
}
