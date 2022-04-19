import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  profile;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getProfile(params.id);
    });
  }

  getProfile(id) {
    this.http
      .get<any>(`https://akabab.github.io/starwars-api/api/id/${id}.json`)
      .subscribe((data) => {
        console.log('the user is', data);
        this.profile = data;
      });
  }

  goBack() {
    this.router.navigate(['/tabs/tab3']);
  }
}
