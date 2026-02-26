import { Component, inject, computed, signal } from '@angular/core';
import { OperationsService } from '../services/operations-service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-history-operations',
  imports: [DatePipe],
  templateUrl: './history-operations.html',
  styleUrl: './history-operations.css',
})
export class HistoryOperations {
  private route = inject(ActivatedRoute)
  private operationsService = inject(OperationsService)
  
  protected userLogin = signal('')
  protected operations = computed(() => this.operationsService.operations().filter(operation => operation.login == this.userLogin()))

  constructor(){
    this.route.params.subscribe((params)=>{
      this.userLogin.set(params['login'])
    })
  }
  
  deleteOperation(id:number, operation:boolean, sum:string, login:string){
    this.operationsService.deleteOperation(id, operation, sum, login)
  }
}
