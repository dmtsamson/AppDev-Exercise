import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  }

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit() {
    const {username, password} = this.form;
    
    this.authService.login(username, password).subscribe({
      next: (token: string) => {
        const clean = token.replace(/^"+|"+$/g, '');
        this.tokenStorage.saveToken(clean);
        this.authService.isLoggedIn = true;

        const redirect = this.authService.redirectUrl || '/';
        this.router.navigate([redirect]);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials and try again.');
      }
    });

    this.http.post<LoginPostData>("https://localhost:7193/api/Login/login", { username, 
      password}).subscribe(data => {
        this.tokenStorage.saveToken(data.id_token);
        this.tokenStorage.saveUser(data.id);
        this.router.navigate([this.authService.redirectUrl]);
        window.location.reload();
      })
    }
  }

  export interface LoginPostData {
    id_token: string;
    id: number;
  }
