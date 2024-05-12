import { Component, Input } from '@angular/core';

@Component({
  selector: 'review-box',
  templateUrl: './review-box.component.html',
  styleUrl: './review-box.component.scss'
})
export class ReviewBoxComponent {
@Input() note: number = 1
@Input() count?: number
}
