import { Routes } from '@angular/router';
 
import { ProducteComponent } from './pages/producte/producte.component';
import { ViewProducteComponent } from './pages/view-producte/view-producte.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    
  { path: 'producte', component: ProducteComponent },
  
  // Dynamic route with ID
  { path: 'view-producte/:id', component: ViewProducteComponent },

  // Redirect empty path
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { path: '**', redirectTo: 'product' },

  {path:'cart',
    component:CartComponent
  }
    
];
