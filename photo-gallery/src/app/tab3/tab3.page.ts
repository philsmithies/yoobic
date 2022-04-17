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
      .get<any>(
        'https://randomuser.me/api/?results=50&seed=lightning&nat=fr,gb'
      )
      .subscribe((data) => {
        this.profiles = data.results;
        console.log('profiles are ', this.profiles);
      });
  }

  openProfile(profile) {
    console.log(profile);
    // to change to be ID when we have the database setup
    this.router.navigate(['details', { email: profile.email }]);
  }
}
