import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
})
export class GithubComponent implements OnInit {
  constructor(
    private readonly supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {}

  async handleGithubLogin(event: any) {
    event.preventDefault();
    try {
      await this.supabase.signInWithGithub();
    } catch (error) {
      await this.supabase.createNotice(
        error.error_description || error.message
      );
    }
    this.router.navigate(['/tabs/masters'], { replaceUrl: true });
  }
}
