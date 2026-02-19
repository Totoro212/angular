import { Component, inject, computed } from '@angular/core';
import { AccountsService } from '../services/accounts-service';
import { OperationsService } from '../services/operations-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-operations',
  imports: [FormsModule, DatePipe],
  templateUrl: './operations.html',
  styleUrl: './operations.css',
})
export class Operations {
  operationsService = inject(OperationsService)
  route = inject(ActivatedRoute)
  accountsService = inject(AccountsService)
  currentUserLogin = this.accountsService.currentUser
  currentUser = computed(() => this.accountsService.getUserByLogin(this.currentUserLogin()))
  errorMessage = ''
  sum = ''
  makeTransaction(operation: boolean) {
    if (this.currentUser()?.balance! - Number(this.sum) < 0 && !operation) {
      this.errorMessage = 'На балансе меньше средств'
    }
    else if (Number(this.sum) > 0) {
      this.operationsService.makeTransaction(this.currentUserLogin(), Number(this.sum), operation)
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
