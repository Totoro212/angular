import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { OperationInterface } from '../interfaces/operation-interface';
import { AuthService } from './auth-service';
import { AccountsService } from './accounts-service';
@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  authService = inject(AuthService)
  accountsService = inject(AccountsService)
  accounts = this.accountsService.getAllAccounts()
  operations = signal<OperationInterface[]>(JSON.parse(localStorage.getItem('operations') || '[]'))
  currentUser = computed(()=> this.authService.currentUser())

  constructor(){
    effect(()=>localStorage.setItem('operations', JSON.stringify(this.operations())))
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
    this.operationWithBalance(login, sum, operation)
  }

  operationWithBalance(login:string, sum:number, operation:boolean){
    this.accounts.update(accounts=>{
      return accounts.map(acc=>{
        if(acc.login == login && operation){
          return {...acc, balance:acc.balance+sum}
        }
        else if (acc.login ==login && !operation){
          return {...acc, balance:acc.balance-sum}
        }
        else{
          return acc
        }
      })
    })
  }
}
