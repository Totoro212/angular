import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AccountsService } from '../services/accounts-service';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  accountsService = inject(AccountsService)
  currentUser = this.accountsService.currentUser
  logOut(){
    this.accountsService.logOut()
  }
}
