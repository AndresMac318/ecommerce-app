import { inject, Injectable } from '@angular/core';

import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialog = inject(Dialog);

  /**
   * @param component: componente a mostrar en el dialog
   * @param data: Datos a pasar al componente
   * @param config: configuracion adicional del dialog
   * @returns: referencia al dialog abierto
   * */
  open<T, D = any, R = any>(
    component: ComponentType<T>,
    data?: D,
    config: any = {}
  ):DialogRef<R>{
    return this.dialog.open<R>(component, {
      
      panelClass: 'myDialog',
      /* backdropClass: 'myDialogBackdrop',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms', */
      ...config,
      data
    });
  }

}
