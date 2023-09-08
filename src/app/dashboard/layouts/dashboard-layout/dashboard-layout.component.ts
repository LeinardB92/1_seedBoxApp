import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  private authService = inject( AuthService );

  //Cualquiera de estas dos maneras es correcto, con una propiedad computada o con un getter, solo asegúrate de estandarizar la manera de hacerlo en el proyecto.
  public user = computed(() => this.authService.currentUser() );
  // get user() {
  //   return this.authService.currentUser();
  // }



}
