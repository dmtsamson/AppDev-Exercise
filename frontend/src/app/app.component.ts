import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  @HostBinding('class.dark-theme') dark = false;

  ngOnInit() {
    const saved = localStorage.getItem('prefersDark');
    this.dark = saved ? saved === 'true' : window.matchMedia('(prefers=color-scheme: dark)').matches;
  }
  toggleTheme() {
    this.dark = !this.dark;
    localStorage.setItem('prefersDark', String(this.dark));
  }
}
