import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  profile;
  constructor(
    private readonly supabase: SupabaseService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getProfile(params.id);
    });
  }

  /**
   * DRY import here from shared?
   */

  capitalizeString(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  getProfile(id) {
    this.supabase.starWarsProfile(id).then(({ data }) => {
      this.profile = data;
    });
  }

  goBack() {
    this.router.navigate(['/tabs/masters']);
  }

  vote() {
    this.supabase.addVote(this.profile.id);
  }
}
