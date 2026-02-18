import { computed, inject, Injectable, signal } from '@angular/core';
import { OperationInterface } from '../interfaces/operation-interface';
import { AccountsService } from './accounts-service';
@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  accountsService = inject(AccountsService)
  operations = signal<OperationInterface[]>([])
  accounts = this.accountsService.getAllAccounts()
  currentUser = this.accountsService.getUserByLogin(this.accountsService.currentUser())
  dataOperations = localStorage.getItem('operations')

  saveOperationsInLocalStorage(){
    localStorage.setItem('operations', JSON.stringify(this.operations()))
  }
  constructor(){
    if(this.dataOperations){
      this.operations.set(JSON.parse(this.dataOperations))
    }
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

  makeTransaction(login:string, sum:number, operation:boolean){
    const newOperation:OperationInterface = {
      login,
      sum,
      operation,
      date:Date.now()
    }
    this.operations.update(operations=>[...operations, newOperation])
    this.operationWithBalance(login, sum, operation)
    this.accountsService.saveUserInLocalStorage()
    this.saveOperationsInLocalStorage()
  }
  getAllOperations(){
    return this.operations
  } 
}
