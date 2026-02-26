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
  route = inject(ActivatedRoute)
  operationsService = inject(OperationsService)
  
  user = signal('')
  operations = computed(() => this.operationsService.operations().filter(operation => operation.login == this.user()))

  constructor(){
    this.route.params.subscribe((params)=>{
      this.user.set(params['login'])
    })
  }
  
  deleteOperation(id:number, operation:boolean, sum:number, login:string){
    this.operationsService.deleteOperation(id, operation, sum, login)
  }
}
