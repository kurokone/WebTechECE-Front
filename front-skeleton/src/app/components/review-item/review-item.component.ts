import { Component, Input } from '@angular/core';

@Component({
  selector: 'review-item',
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.scss'
})
export class ReviewItemComponent {

  @Input() review: any
}
