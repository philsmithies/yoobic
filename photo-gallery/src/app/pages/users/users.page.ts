/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  profiles: any[];

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.getProfiles();
  }

  async getProfiles() {
    try {
      let { data: profiles, error, status } = await this.supabase.profiles;
      if (error && status !== 406) {
        throw error;
      }
      this.profiles = profiles;
    } catch (error) {
      alert(error.message);
    }
  }
}
