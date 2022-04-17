import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-login',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="ion-padding">
        <p>Sign in via magic link with your email below</p>
      </div>
      <ion-list inset="true">
        <form (ngSubmit)="handleLogin($event)">
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              [(ngModel)]="email"
              name="email"
              autocomplete
              type="email"
            ></ion-input>
          </ion-item>
          <div class="ion-text-center">
            <ion-button type="submit" fill="clear">Login</ion-button>
          </div>
        </form>
      </ion-list>
    </ion-content>
  `,
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {}
  async handleLogin(event: any) {
    event.preventDefault();
    const loader = await this.supabase.createLoader();
    await loader.present();
    try {
      await this.supabase.signIn(this.email);
      await loader.dismiss();
      await this.supabase.createNotice('Check your email for the login link!');
    } catch (error) {
      await loader.dismiss();
      await this.supabase.createNotice(
        error.error_description || error.message
      );
    }
  }
}
