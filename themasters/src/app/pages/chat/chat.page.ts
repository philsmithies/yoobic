/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages;
  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.getMessages();
  }

  async getMessages() {
    try {
      let { data: messages, error, status } = await this.supabase.getMessages;
      if (error && status !== 406) {
        throw error;
      }
      if (messages) {
        console.log('messages are ', messages[0]);
        this.messages = messages;
      }
    } catch (error) {
      alert(error.message);
    }
  }
}
