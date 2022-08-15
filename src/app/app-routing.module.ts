import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariationComponent } from './variation/variation.component';
import { AppComponent } from './app.component';

const routes: Routes = [


  { path: 'variation', component: VariationComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
