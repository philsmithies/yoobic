import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  profiles;
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles() {
    this.http
      .get<any>('https://akabab.github.io/starwars-api/api/all.json')
      .subscribe((data) => {
        this.profiles = data;
        console.log('profiles are ', data);
      });
  }

  openProfile(profile) {
    console.log('the id ', profile.id);
    // to change to be ID when we have the database setup
    this.router.navigate(['tabs/details', { id: profile.id }]);
  }
}
