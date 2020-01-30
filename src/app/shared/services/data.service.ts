import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private $postingData = new ReplaySubject<any>(1);
  private $details = new ReplaySubject<any>(1);
  private $filters = new ReplaySubject<any>(1);

  private baseApiEndpoint: string = 'https://api.smartrecruiters.com/v1/';
  constructor(private http: HttpClient) { }

  setPostingDataStatus(): void {
    this.http.get(`${this.baseApiEndpoint}companies/smartrecruiters/postings`).subscribe(data => {
      this.$postingData.next(data);
    });
  }

  getPostingDataAsObservable(): Observable<any> {
    return this.$postingData.asObservable();
  }

  setDetails(id: string): void {
    this.http.get(`${this.baseApiEndpoint}companies/smartrecruiters/postings/${id}`).subscribe(data => {
      this.$details.next(data);
    });
  }

  getFiltersAsObservable(): Observable<any> {
    return this.$filters.asObservable();
  }

  setFilters(): void {
    this.http.get(`${this.baseApiEndpoint}departments`).subscribe(data => {
      this.$filters.next(data);
    });
  }

  getDetailsAsObservable(): Observable<any> {
    return this.$details.asObservable();
  }

  filterCountries(): void {
    this.http.get(`${this.baseApiEndpoint}/&country={Poland}`).subscribe(data => {
      this.$details.next(data);
    });
  }
}
