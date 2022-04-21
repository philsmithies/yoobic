/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'masters.page.html',
  styleUrls: ['masters.page.scss'],
})
export class MastersPage implements OnInit {
  profiles;
  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly supabase: SupabaseService
  ) {}
  ngOnInit(): void {
    this.getProfiles();
  }

  async getProfiles() {
    try {
      let { data: profiles, error, status } = await this.supabase.starWarsApi;
      if (error && status !== 406) {
        throw error;
      }
      if (profiles) {
        console.log('profiles are ', profiles[0]);
        this.profiles = profiles;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  capitalizeString(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  openProfile(profile) {
    console.log('the id ', profile.id);
    // to change to be ID when we have the database setup
    this.router.navigate(['tabs/details', { id: profile.id }]);
  }
}
