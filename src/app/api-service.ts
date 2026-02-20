import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = environment.apiURl;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  
GetRoomGraphicalReport() {
  return this.http.post<any>(`${this.baseUrl}RoomMaster/GetRoomGraphicalReport`,{});
}
  GetTodayVoidTransactions() {
    return this.http.get<any>(
      `${this.baseUrl}IonicData/GetTodayVoidTransactions`,
    );
  }
  GetCurrentGuests() {
    return this.http.get<any>(`${this.baseUrl}IonicData/GetCurrentGuests`);
  }
}
