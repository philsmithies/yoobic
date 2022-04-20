/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  session = this.supabase.session;
  constructor(
    private readonly supabase: SupabaseService,
    private router: Router
  ) {
    console.log('the sessions is ', this.session);
  }

  async signOut() {
    await this.supabase.signOut();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
