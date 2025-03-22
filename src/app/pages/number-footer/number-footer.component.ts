import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-footer',
  templateUrl: './number-footer.component.html',
  styleUrls: ['./number-footer.component.scss']
})
export class NumberFooterComponent {
  @Input() footerData: any;
}
