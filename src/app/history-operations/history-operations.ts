import { Component, inject, computed, signal } from '@angular/core';
import { OperationsService } from '../services/operations-service';
import { AccountsService } from '../services/accounts-service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth-service';
import { AccOpeationService } from '../services/acc-opeation-service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-history-operations',
  imports: [DatePipe],
  templateUrl: './history-operations.html',
  styleUrl: './history-operations.css',
})
export class HistoryOperations {
  route = inject(ActivatedRoute)
  authService = inject(AuthService)
  operationsService = inject(OperationsService)
  accOpeationService = inject(AccOpeationService)
  accountsService = inject(AccountsService)
  
  operations = this.operationsService.getAllOperations()
  loginUser = signal('')
  currentUser = computed(()=>this.accountsService.getUserByLogin(this.loginUser()))
  constructor(){
    this.route.params.subscribe((params)=>{
      this.loginUser.set(params['login'])
    })
  }
  deleteOperation(id:number, operation:boolean, sum:number, login:string){
    this.accOpeationService.deleteOperation(id, operation, sum, login)
  }
}
