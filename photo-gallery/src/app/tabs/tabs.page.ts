/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit } from '@angular/core';
import { Profile, SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  session = this.supabase.session;
  constructor(private readonly supabase: SupabaseService) {
    console.log('the sessions is ', this.session);
  }
}
