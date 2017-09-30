import { Component } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oskar1233';

  constructor(private fb: FacebookService) {
    fb.init({
      appId: '1506876406015781',
      xfbml: true,
      version: 'v2.10'
    })
  }
}
