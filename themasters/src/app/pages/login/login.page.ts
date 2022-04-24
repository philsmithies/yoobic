import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  loginActive = true;
  constructor(
    private readonly supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.supabase.session) {
      this.router.navigate(['/tabs/masters'], { replaceUrl: true });
    }
  }
}
