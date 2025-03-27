import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {  
  
  public readonly toggleSidenavSignal = signal(false);

  toggleSignal(){
    this.toggleSidenavSignal.update(state => !state);
  }

}
