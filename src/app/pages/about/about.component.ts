import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  isDonationEnabled: false
  constructor(public translate: TranslateService) {}
}
