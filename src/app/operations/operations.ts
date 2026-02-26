import { Component, inject, computed } from '@angular/core';
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
  private authService = inject(AuthService)
  private operationsService = inject(OperationsService)
  
  protected currentUser = computed(()=>this.authService.currentUser())
  
  protected errorMessage =''
  protected sum = ''
  
  makeTransaction(operation:boolean){
    if(Number(this.sum)>0){
      this.operationsService.makeTransaction(this.currentUser()?.login!, Number(this.sum), operation)
      this.errorMessage = ''
    }
    else {
      this.errorMessage = 'Введите реальное число'
    }
    
      this.sum = ''
  }

  blocke(event: KeyboardEvent) {
    if (['e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  }
}
