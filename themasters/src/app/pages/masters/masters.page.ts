/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-masters',
  templateUrl: 'masters.page.html',
  styleUrls: ['masters.page.scss'],
})
export class MastersPage implements OnInit {
  masters;
  constructor(
    private http: HttpClient,
    private readonly supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.getMasters();
  }

  async getMasters() {
    try {
      let { data: masters, error, status } = await this.supabase.starWarsApi;
      if (error && status !== 406) {
        throw error;
      }
      if (masters) {
        this.masters = masters;
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
