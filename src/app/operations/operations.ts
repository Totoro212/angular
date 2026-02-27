import { Component, inject, computed } from '@angular/core';
import { OperationsService } from '../services/operations-service';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { HistoryOperations } from "../history-operations/history-operations";
import { AuthService } from '../services/auth-service';
@Component({
  selector: 'app-operations',
  imports: [ReactiveFormsModule, HistoryOperations],
  templateUrl: './operations.html',
  styleUrl: './operations.css',
})
export class Operations {
  private authService = inject(AuthService)
  private operationsService = inject(OperationsService)

  protected currentUser = computed(() => this.authService.currentUser())

  protected errorMessage = ''
  protected sum = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')])

  makeTransaction(operation: boolean) {
    if (this.sum.valid) {
      if (Number(this.sum.value) < 100000000000000000000000000000000000000000000000000){ 
        this.operationsService.makeTransaction(this.currentUser()?.login!, this.sum.value!, operation)
        this.errorMessage = ''
      }else{
        this.errorMessage = 'Введите число менее 100 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000'
      }
    }
    else {
      this.errorMessage = 'Введите реальное число'
    }
    this.sum.reset()
  }
}
