import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public readonly toggleSidenavSignal = signal(false);
  private keyName = 'appKit_ecommerce/sidenavCollapse';

  toggleSignal() {
    this.toggleSidenavSignal.update((state) => !state);
    localStorage.setItem(
      this.keyName,
      JSON.stringify(this.toggleSidenavSignal())
    );
  }

  constructor() {
    const storage = localStorage.getItem(this.keyName);
    if (storage !== null) {
      this.toggleSidenavSignal.set(JSON.parse(storage));
    }
  }
}
