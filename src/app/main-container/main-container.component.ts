import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../shared/services/data.service';
@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit, OnDestroy {
  postingData: Array<any>;
  detailsData: any;
  options: any;
  country: any;
  department: any;
  isCountry: boolean;
  isDepartment: boolean;
  departments: any[] = [];
  countries: any[] = [];
  private $unsubscribe: Subject<void> = new Subject<void>();
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.setPostingDataStatus();
    this.dataService.getPostingDataAsObservable().pipe(takeUntil(this.$unsubscribe)).subscribe(data => {
      this.postingData = data.content;
      this.postingData.forEach(element => {
        if (!this.countries.includes(element.location.city)) {
          this.countries.push(element.location.city);
        }
        if (!this.departments.includes(element.department.label)) {
          this.departments.push(element.department.label);
        }
      });
    });

  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  filterCountries(country: string): void {
    this.dataService.setPostingDataStatus();
    setTimeout(() => {
      if (this.department) {
        this.postingData = this.postingData.filter(item => item.department.label === this.department);
        this.postingData = this.postingData.filter(item => item.location.city === country);
      } else {
        this.postingData = this.postingData.filter(item => item.location.city === country);
      }
    }, 1000);
  }
  filterDepartments(department: string ): void {
    this.dataService.setPostingDataStatus();
    setTimeout(() => {
      if (this.country) {
        this.postingData = this.postingData.filter(item => item.location.city === this.country);
        this.postingData = this.postingData.filter(item => item.department.label === department);
      } else {
        this.postingData = this.postingData.filter(item => item.department.label === department);
      }
    }, 1000);
  }
}
