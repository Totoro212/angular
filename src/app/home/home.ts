import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth-service';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  authService = inject(AuthService)
  currentUser = computed(()=>this.authService.currentLogin())
  logOut(){
    this.authService.logOut() 
  }
}
