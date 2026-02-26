import { effect, inject, Injectable,signal } from '@angular/core';
import { OperationInterface } from '../interfaces/operation-interface';
import { AuthService } from './auth-service';
import { AccountsService } from './accounts-service';
import Decimal from 'decimal.js';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  private accountsService = inject(AccountsService)
  
  public operations = signal<OperationInterface[]>(JSON.parse(localStorage.getItem('operations') || '[]'))

  constructor(){
    effect(()=>{
      localStorage.setItem('operations', JSON.stringify(this.operations()))
    })
  }

  makeTransaction(login:string, sum:string, operation:boolean){
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

  deleteOperation(id:number, operation:boolean, sum:string, login:string){
    this.operations.update(operations => operations.filter(oper => oper.id != id))
    this.accountsService.changeUserBalance(login, sum, !operation)
  }

  deleteAllAccountOperations(login:string){
    this.operations.update(operations => operations.filter(operation => operation.login != login))
  }

}
