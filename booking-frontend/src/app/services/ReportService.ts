import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environments";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'  
})
export class ReportServices {
  private apiUrl = environment.apiUrl + '/Report';

  constructor(private httpClient: HttpClient) {}

  GetUserStats():any  {
    return this.httpClient.get(`${this.apiUrl}/report-stats`);
  }
}
