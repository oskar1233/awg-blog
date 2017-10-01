import { Component } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oskar1233';
  scrolled: boolean = false;

  constructor(private fb: FacebookService) {
    fb.init({
      appId: '1506876406015781',
      xfbml: true,
      version: 'v2.10'
    })
  }

  scroll(event: Event) {
    let mainElem: Element = <Element> event.target;
    this.scrolled = mainElem.scrollTop != 0;
  }
}
