import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [ TranslatePipe, RouterLink ],
  template: `
    <footer class="footer">
      <ul class="footer__list">
        <li>
          <a class="footer__itemlist" routerLink="/" >{{"MAIN_COMPONENTS.sidenav.items.item1" | translate}}</a>
        </li>
        <li>
          <a class="footer__itemlist" routerLink="/buys">{{"MAIN_COMPONENTS.sidenav.items.item2" | translate}}</a>
        </li>
        <li class="footer__itemlist">
          <a class="footer__itemlist">{{"MAIN_COMPONENTS.sidenav.items.item3" | translate}}</a>
        </li>
        <li class="footer__itemlist">
          <a class="footer__itemlist">{{"MAIN_COMPONENTS.sidenav.items.item4" | translate}}</a
          >
        </li>
        <li class="footer__itemlist">
          <a class="footer__itemlist">{{"MAIN_COMPONENTS.sidenav.items.item5" | translate}}</a>
        </li>
      </ul>
      <div class="footer__containercopytext">
        <a href="https://luis-macea-dev.netlify.app/" target="_blank" class="footer__copytext">© {{ currentYear }} {{"MAIN_COMPONENTS.footer.text1" | translate}}</a>
        <a href="https://luis-macea-dev.netlify.app/" target="_blank" class="footer__owner">{{"MAIN_COMPONENTS.footer.text2" | translate}}</a>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  get currentYear(){
    const date = new Date();
    return date.getFullYear();
  }

}
