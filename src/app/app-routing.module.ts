import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './main-container/main-container.component';
import { MainDetailsComponent } from './main-container/main-details/main-details.component';

const routes: Routes = [
    {
      path: '',
      component: MainContainerComponent,
      pathMatch: 'full',
    },
    {
      path: ':id',
      component: MainDetailsComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
