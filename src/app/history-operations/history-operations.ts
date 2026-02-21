import { Component, inject, computed, signal } from '@angular/core';
import { OperationsService } from '../services/operations-service';
import { DatePipe } from '@angular/common';
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
  operationsService = inject(OperationsService)
  accOpeationService = inject(AccOpeationService)
  
  user = signal('')
  operations = this.operationsService.getAllOperations()

  constructor(){
    this.route.params.subscribe((params)=>{
      this.user.set(params['login'])
    })
  }
  deleteOperation(id:number, operation:boolean, sum:number, login:string){
    this.accOpeationService.deleteOperation(id, operation, sum, login)
  }
}
