import { inject, Injectable } from '@angular/core';
import { AccountsService } from './accounts-service';
import { OperationsService } from './operations-service';
import { AuthService } from './auth-service';
@Injectable({
  providedIn: 'root',
})
export class AccOpeationService {
  authService = inject(AuthService)
  accountsService = inject(AccountsService)
  operationsService = inject(OperationsService)
  accounts = this.accountsService.getAllAccounts()
  currentUser = this.authService.currentUser()
  operations = this.operationsService.getAllOperations()
  
  deleteAccount(login:string){
    this.accounts.update(accounts => accounts.filter(account => account.login != login))
    this.operations.update(operations => operations.filter(operation => operation.login != login))
  }
  
  deleteOperation(id:number, operation:boolean, sum:number, login:string){
    this.operations.update(operations => operations.filter(operation => operation.id != id))
    this.accounts.update(accounts => {
      return accounts.map(account => {
        if(account.login == login && operation){
          return {...account, balance:account.balance-sum}
        }
        else if (account.login == login && !operation){
          return {...account, balance:account.balance+sum}
        }
        return account
      })
    })
  }
}
