import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'view-modal',
  templateUrl: './view-modal.component.html',
  styleUrl: './view-modal.component.scss'
})
export class ViewModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter<any>();
  @ViewChild('viewModal') viewModal?: ElementRef;
  @Input() entity?: any
  modelEntities?: any

  modal: any

  constructor() { }


  ngOnInit(): void {
    this.showModal()
    if(this.entity){
      this.modelEntities = Object.keys(this.entity)
      this.modelEntities = this.modelEntities.filter((k: string) => k !== 'id')
    }
  }


  showModal(): void {
    this.modal = new (window as any).bootstrap.Modal(document.getElementById('formModal'), {backdrop: 'static'});
    this.modal.show();
  }


  onCancel(){
    this.closeModal.emit(null);
    this.modal.hide();
  }
}
