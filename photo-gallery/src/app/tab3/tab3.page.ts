import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  profiles;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles() {
    this.http
      .get<any>('https://randomuser.me/api/?results=50')
      .subscribe((data) => {
        this.profiles = data.results;
        console.log('profiles are ', this.profiles);
      });
  }
}
