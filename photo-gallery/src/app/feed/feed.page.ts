/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Profile, SupabaseService } from '../services/supabase.service';
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

  ngOnInit(): void {
    this.fetchTodos();
  }

  async addTodo(): Promise<void> {
    let task = this.todoForm.value.task.trim();
    if (task.length <= 3) {
      this.errorText = 'Task length should be more than 3!';
    } else {
      let { data: todo, error } = await this.supabase.addTodo(task);
      if (error) {
        this.errorText = error.message;
      } else {
        this.todos = [todo, ...this.todos];
        this.errorText = null;
        this.todoForm.reset();
      }
    }
  }

  async fetchTodos(): Promise<void> {
    let { data: todos, error } = await this.supabase.fetchTodos();
    console.log('todo list', todos);
    if (error) {
      console.error('error', error.message);
    } else {
      this.todos = todos ?? [];
    }
  }
}
