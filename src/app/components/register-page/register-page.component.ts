import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  form: any = {
    username: null,
    password: null,
    firstname: null,
    lastname: null
  }

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const {
      username, password, firstName, lastName
    } = this.form

    console.log(this.form);

    this.http.post("https://localhost:7193/api/Login/register", this.form, {responseType: 
      'text'}).subscribe(data => {
        this.route.navigate(['/login'])
      })
    }
  }
