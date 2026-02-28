import { Routes } from '@angular/router';
import { Accounts } from './accounts/accounts';
import { Balance } from './balance/balance';
import { Login } from './login/login';
import { Operations } from './operations/operations';
import { HistoryOperations } from './history-operations/history-operations';
import { Posts } from './posts/posts';
import { PostDetails } from './post-details/post-details';
export const routes: Routes = [
    {path:'accounts', component:Accounts},
    {path:'balance', component:Balance},
    {path:'login', component:Login},
    {path:'operations/:login', component:Operations},
    {path:'history/:login', component:HistoryOperations},
    {path:'posts', component:Posts},
    {path:'post-details/:id', component:PostDetails}

];
