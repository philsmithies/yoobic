import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password: '';
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
      await this.supabase.createNotice('Success!');
      this.router.navigate(['/tabs/tab3'], { replaceUrl: true });
    } catch (error) {
      await loader.dismiss();
      await this.supabase.createNotice(
        error.error_description || error.message
      );
    }
  }

  handleFormChange() {
    console.log('this login is', this.loginActive);
    this.loginActive = !this.loginActive;
    console.log('this login is', this.loginActive);
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    const loader = await this.supabase.createLoader();
    await loader.present();
    try {
      await this.supabase.signUp(this.email, this.password);
      await loader.dismiss();
      await this.supabase.createNotice('Signed up!');
    } catch (error) {
      await loader.dismiss();
      await this.supabase.createNotice(
        error.error_description || error.message
      );
    }
  }
}
