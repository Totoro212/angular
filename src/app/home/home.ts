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
  private authService = inject(AuthService)
  protected currentUser = computed(()=>this.authService.currentUser())
  logOut(){
    if(this.currentUser()) this.authService.logOut() 
  }
}
