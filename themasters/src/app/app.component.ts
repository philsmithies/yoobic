import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  session = this.supabase.session;
  constructor(private supabase: SupabaseService, private router: Router) {
    this.supabase.authChanges((_, session) => {
      console.log(session);
      if (!session?.user) {
        this.router.navigate(['/login']);
      }
    });
  }

  async signOut() {
    await this.supabase.signOut();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
