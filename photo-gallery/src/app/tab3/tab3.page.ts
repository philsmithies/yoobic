/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
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
        console.log('profiles are ', profiles);
        this.profiles = profiles;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  capitalizeSpecies(speciesInputString) {
    return (
      speciesInputString.charAt(0).toUpperCase() + speciesInputString.slice(1)
    );
  }

  openProfile(profile) {
    console.log('the id ', profile.id);
    // to change to be ID when we have the database setup
    this.router.navigate(['tabs/details', { id: profile.id }]);
  }
}
