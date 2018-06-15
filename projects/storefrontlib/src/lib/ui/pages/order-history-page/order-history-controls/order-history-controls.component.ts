import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'y-order-history-controls',
  templateUrl: './order-history-controls.component.html',
  styleUrls: ['./order-history-controls.component.scss']
})
export class OrderHistoryControlsComponent implements OnInit {
  @Input() numberOfPages: number;
  @Input() sort: string;
  @Output() viewPageEvent: EventEmitter = new EventEmitter<number>();

  currentPage: number;
  paginationBoundaries: number;
  pages: number[];
  constructor() {}

  ngOnInit() {
    this.pages = Array(this.numberOfPages)
      .fill(0)
      .map((x, i) => i + 1);

    this.currentPage = 1;
    this.paginationBoundaries = 1;
  }

  viewPage(pageNumber: number) {
    this.currentPage = pageNumber;

    if (pageNumber === 1) {
      this.paginationBoundaries = 1;
    } else if (pageNumber === this.pages.length) {
      this.paginationBoundaries = this.pages.length - 2; // the last page - 2
    } else {
      this.paginationBoundaries = pageNumber - 1;
    }

    this.viewPageEvent.emit(this.currentPage);
  }

  prevPage() {
    if (this.currentPage !== 1) {
      this.viewPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage !== this.pages.length) {
      this.viewPage(this.currentPage + 1);
    }
  }
}
