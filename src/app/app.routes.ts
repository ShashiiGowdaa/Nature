import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RegisterComponent } from './register/register.component';
import { SaplingsComponent } from './saplings/saplings.component';
import { SeedsComponent } from './seeds/seeds.component';
import { ToolsComponent } from './tools/tools.component';
import { ManureComponent } from './manure/manure.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'products', component: ProductsComponent,
        children: [
            { path: 'saplings', component: SaplingsComponent },
            {path: 'saplings/:sortBy', component: SaplingsComponent},
            { path: 'seeds', component: SeedsComponent },
            { path: 'tools', component: ToolsComponent },
            { path: 'manure', component: ManureComponent },
          ],
    },
    {path:'about-us', component: AboutUsComponent},
    {path:'feedback',component: FeedbackComponent},
    {path:'**', component: PageNotFoundComponent}
];
