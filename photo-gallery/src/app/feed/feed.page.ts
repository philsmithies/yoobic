/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Profile, SupabaseService } from '../services/supabase.service';
import { Note } from '../models/note';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  notes: Note[] = [];
  noteForm: FormGroup = new FormGroup({
    task: new FormControl(),
  });
  errorText: string | undefined | null;
  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  async addTodo(): Promise<void> {
    let task = this.noteForm.value.task.trim();
    if (task.length <= 3) {
      this.errorText = 'Task length should be more than 3!';
    } else {
      let { data: todo, error } = await this.supabase.addNote(task);
      if (error) {
        this.errorText = error.message;
      } else {
        this.notes = [todo, ...this.notes];
        this.errorText = null;
        this.noteForm.reset();
      }
    }
  }

  async fetchNotes(): Promise<void> {
    let { data: todos, error } = await this.supabase.fetchNotes();
    console.log('todo list', todos);
    if (error) {
      console.error('error', error.message);
    } else {
      this.notes = todos ?? [];
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.supabase.deleteNote(id);
      this.notes = this.notes.filter((todo) => todo.id !== id);
    } catch (error) {
      console.error('error', error);
    }
  }
}
