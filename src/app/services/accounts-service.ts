import { effect, Injectable, signal } from '@angular/core';
import { AccountsInterface } from '../interfaces/accounts-interface';
import Decimal from 'decimal.js';

Decimal.set({ precision: 50, toExpNeg: -50, toExpPos: 50 });

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  public accounts = signal<AccountsInterface[]>(JSON.parse(localStorage.getItem('users') || '[]'))

  constructor() {
    effect(() => localStorage.setItem('users', JSON.stringify(this.accounts())))
  }

  deleteAccount(login: string) {
    this.accounts.update(accounts => accounts.filter(account => account.login != login))
  }

  createAccount(login: string, password: string, firstname: string, lastname: string) {
    const newAccount: AccountsInterface = {
      login,
      password,
      firstname,
      lastname,
      balance: '0'
    }
    if (this.accounts().find(acc => acc.login == login)) {
      return false
    }
    else {
      this.accounts.update(accounts => [...accounts, newAccount])
      return true
    }
  }

  changeUserBalance(login: string, sum: string, operation: boolean) {
    const quantity = new Decimal(sum)
    this.accounts.update(accounts => {
      return accounts.map(account => {
        const balance = new Decimal(account.balance)
        if (account.login == login && operation) {
          return { ...account, balance: balance.plus(quantity).toFixed() }
        }
        else if (account.login == login && !operation) {
          return { ...account, balance: balance.minus(quantity).toFixed() }
        }
        return account
      })
    })
  }

}
