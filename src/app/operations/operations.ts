import { Component, inject, computed } from '@angular/core';
import { AccountsService } from '../services/accounts-service';
import { OperationsService } from '../services/operations-service';
import { FormsModule } from '@angular/forms';
import { HistoryOperations } from "../history-operations/history-operations";
import { AuthService } from '../services/auth-service';
@Component({
  selector: 'app-operations',
  imports: [FormsModule, HistoryOperations],
  templateUrl: './operations.html',
  styleUrl: './operations.css',
})
export class Operations {
  authService = inject(AuthService)
  operationsService = inject(OperationsService)
  accountsService = inject(AccountsService)
  currentUser = computed(()=>this.accountsService.getUserByLogin(this.authService.currentLogin()))
  errorMessage =''
  sum = ''
  
  makeTransaction(operation:boolean){
    if(Number(this.sum)>0){
      this.operationsService.makeTransaction(this.currentUser()?.login!, Number(this.sum), operation)
      console.log(this.sum, operation)
      this.errorMessage = ''
    }
    else {
      this.errorMessage = 'Введите реальное число'
    }
      this.sum = ''
  }
  operations = this.operationsService.getAllOperations()
}
