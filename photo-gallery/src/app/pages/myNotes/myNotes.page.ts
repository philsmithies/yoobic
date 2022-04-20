/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Profile, SupabaseService } from '../../services/supabase.service';
import { Note } from '../../models/note';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './myNotes.page.html',
  styleUrls: ['./myNotes.page.scss'],
})
export class MyNotesPage implements OnInit {
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

  async addNote(): Promise<void> {
    let task = this.noteForm.value.task.trim();
    if (task.length <= 3) {
      this.errorText = 'Note length should be more than 3!';
    } else {
      let { data: note, error } = await this.supabase.addNote(task);
      if (error) {
        this.errorText = error.message;
      } else {
        this.notes = [note, ...this.notes];
        this.errorText = null;
        this.noteForm.reset();
      }
    }
  }

  async fetchNotes(): Promise<void> {
    let { data: notes, error } = await this.supabase.fetchNotes();
    console.log('notes list', notes);
    if (error) {
      console.error('error', error.message);
    } else {
      this.notes = notes ?? [];
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.supabase.deleteNote(id);
      this.notes = this.notes.filter((note) => note.id !== id);
    } catch (error) {
      console.error('error', error);
    }
  }
}
