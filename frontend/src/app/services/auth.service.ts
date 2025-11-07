import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  public redirectUrl: string = "";
  private base = 'https://localhost:7193';

  constructor(private http: HttpClient) { 

  }
  
  login(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.base}/api/Login/login`,
      { username, password },
      { headers, responseType: 'text' }
    );
  }
}
