import { inject, Injectable } from '@angular/core';

import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(Dialog);

  /**
   * @param component: component to showing on the dialog
   * @param data: Data to send at component
   * @param config: config additional of dialog
   * @returns: reference at opened dialog
   * */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  open<T, D = any, R = any>(
    component: ComponentType<T>,
    data?: D,
    config: any = {}
  ): DialogRef<R> {
    return this.dialog.open<R>(component, {
      panelClass: 'myDialog',
      ...config,
      data,
    });
  }
}
