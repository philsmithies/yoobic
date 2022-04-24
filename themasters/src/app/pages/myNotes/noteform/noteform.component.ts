/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-noteform',
  templateUrl: './noteform.component.html',
  styleUrls: ['./noteform.component.scss'],
})
export class NoteformComponent implements OnInit {
  notes: Note[] = [];
  noteForm: FormGroup = new FormGroup({
    task: new FormControl(),
  });
  errorText: string | undefined | null;
  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

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
}
