/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  todos: Todo[] = [];
  todoForm: FormGroup = new FormGroup({
    task: new FormControl(),
  });
  errorText: string | undefined | null;
  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  async fetchTodos(): Promise<void> {
    let { data: todos, error } = await this.supabase.fetchTodos();
    if (error) {
      console.error('error', error.message);
    } else {
      this.todos = todos ?? [];
    }
  }
}
