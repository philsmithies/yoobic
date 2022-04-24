/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent implements OnInit {
  messageForm: FormGroup = new FormGroup({
    message: new FormControl(),
  });

  errorText: string | undefined | null;

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {}
  async sendMessage(): Promise<void> {
    let messageText = this.messageForm.value.message.trim();
    let { data: message, error } = await this.supabase.sendMessage(messageText);
    if (error) {
      this.errorText = error.message;
    } else {
      this.errorText = null;
      this.messageForm.reset();
    }
  }
}
