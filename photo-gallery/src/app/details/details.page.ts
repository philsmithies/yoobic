import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    // eslint-disable-next-line prefer-const
    let email = this.activatedRoute.snapshot.paramMap.get('email');
    this.getProfile(email);
  }

  getProfile(email) {
    console.log('the email is', email);
    this.http
      .get<any>(`https://randomuser.me/api/?seed=lightning&email=${email}`)
      .subscribe((data) => {
        this.profile = data.results[0];
      });
  }

  goBack() {
    this.router.navigate(['/tabs/tab3']);
  }
}
