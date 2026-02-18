import { Routes } from '@angular/router';
import { Accounts } from './accounts/accounts';
import { Balance } from './balance/balance';
import { Login } from './login/login';
import { Operations } from './operations/operations';

export const routes: Routes = [
    {path:'accounts', component:Accounts},
    {path:'balance', component:Balance},
    {path:'login', component:Login},
    {path:'operations/:login', component:Operations}
];
