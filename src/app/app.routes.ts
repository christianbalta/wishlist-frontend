import { Routes } from '@angular/router';
import {WishlistComponent} from "./wishlist/wishlist.component";

export const routes: Routes = [
  { path: '', redirectTo: '/wishlist', pathMatch: 'full' },
  { path: 'wishlist', component: WishlistComponent },
];
