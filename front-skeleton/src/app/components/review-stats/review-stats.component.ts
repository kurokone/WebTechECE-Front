import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'review-stats',
  templateUrl: './review-stats.component.html',
  styleUrl: './review-stats.component.scss'
})
export class ReviewStatsComponent  implements OnInit {
  modal: any
  @Output() closeModal = new EventEmitter<any>();
  @ViewChild('statsModal') statsModal?: ElementRef;
  statisticsData: any
  chart: any;

  constructor(private reviewService: ReviewService){}

  ngOnInit(): void {
    this.showModal()
    this.reviewService.getReviewStatistics().subscribe(
      (stats: any)=>{
        this.statisticsData = stats
        this.createChart();
        console.log({stats});

      }
    )

  }
  createChart(): void {
    const ctx = document.getElementById('statisticsChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(this.statisticsData),
        datasets: [{
          label: 'Nombre d\'avis',
          data: Object.values(this.statisticsData),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }


  showModal(): void {
    this.modal = new (window as any).bootstrap.Modal(document.getElementById('statsModal'), { backdrop: 'static'});
    this.modal.show(); // Afficher le modal
  }
  onCancel() {
    this.closeModal.emit(null)
    this.modal.hide(); // Afficher le modal
  }
}
