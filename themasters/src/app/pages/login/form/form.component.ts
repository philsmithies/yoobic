import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  email = '';
  password = '';
  loginActive = true;
  constructor(
    private readonly supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {}

  async handleLogin(event: any) {
    event.preventDefault();
    const loader = await this.supabase.createLoader();
    await loader.present();
    try {
      await this.supabase.signIn(this.email, this.password);
      await loader.dismiss();
      this.router.navigate(['/tabs/masters'], { replaceUrl: true });
    } catch (error) {
      await loader.dismiss();
      await this.supabase.createNotice(
        error.error_description || error.message
      );
    }
  }

  async handleAnonymousLogin(event: any) {
    this.email = 'obiwan@kenobi.net';
    this.password = 'hiluke';
    this.handleLogin(event);
  }

  handleFormChange() {
    this.loginActive = !this.loginActive;
  }
}
