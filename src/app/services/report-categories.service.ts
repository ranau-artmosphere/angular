import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportCategory } from '../classes/report-category';

@Injectable({
  providedIn: 'root'
})
export class ReportCategoriesService {
  readonly reportCategories: Subject<ReportCategory[]> = new Subject<ReportCategory[]>();

  constructor() { }

  getReportCategories() {
    return new window['ReportCategories']()
      .fetchAll()
      .then(result => {
        const reportCategories = result.toJSON();
        this.reportCategories.next(reportCategories);
        return reportCategories;
      });
  }
}
