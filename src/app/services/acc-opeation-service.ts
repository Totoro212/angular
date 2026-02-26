import { inject, Injectable } from '@angular/core';
import { AccountsService } from './accounts-service';
import { OperationsService } from './operations-service';
@Injectable({
  providedIn: 'root',
})
export class AccOpeationService {
  accountsService = inject(AccountsService)
  operationsService = inject(OperationsService)

  deleteAccount(login:string){
    this.accountsService.deleteAccount(login)
    this.operationsService.deleteAllAccountOperations(login)
  }
}