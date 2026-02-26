import { computed, effect, EventEmitter, inject, Injectable, linkedSignal, Output, output, signal } from '@angular/core';
import { OperationInterface } from '../interfaces/operation-interface';
import { AuthService } from './auth-service';
import { AccountsService } from './accounts-service';
@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  authService = inject(AuthService)
  accountsService = inject(AccountsService)
  
  operations = signal<OperationInterface[]>(JSON.parse(localStorage.getItem('operations') || '[]'))

  constructor(){
    effect(()=>{
      localStorage.setItem('operations', JSON.stringify(this.operations()))
    })
  }

  getAllOperations(){return this.operations}

  makeTransaction(login:string, sum:number, operation:boolean){
    const newOperation:OperationInterface = {
      id: Date.now(),
      login,
      sum,
      operation,
      date:Date.now()
    }
    this.operations.update(operations=>[...operations, newOperation])
    this.accountsService.changeUserBalance(login, sum, operation)
  }

  deleteOperation(id:number, operation:boolean, sum:number, login:string){
    this.operations.update(operations => operations.filter(operation => operation.id != id))
    this.accountsService.deleteAccountOperations(operation, sum, login)
  }

  deleteAllAccountOperations(login:string){
    this.operations.update(operations => operations.filter(operation => operation.login != login))
  }
  
}
