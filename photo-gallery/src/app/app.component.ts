import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { AuthService } from './services/auth.service';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // constructor(
  //   private auth: AuthService,
  //   private router: Router,
  //   private storage: Storage,
  //   private menu: MenuController
  // ) {}

  // async ngOnInit() {
  //   // eslint-disable-next-line prefer-const
  //   await this.storage.create();
  //   console.log('storage has been created', this.storage);
  // }
  constructor(private supabase: SupabaseService, private router: Router) {
    this.supabase.authChanges((_, session) => {
      console.log(session);
      if (session?.user) {
        this.router.navigate(['/account']);
      }
    });
  }
}
