/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages = [];
  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.setUpMessagesSubscription(this.messages);
  }

  async getMessages() {
    try {
      let { data: messages, error, status } = await this.supabase.getMessages;
      if (error && status !== 406) {
        throw error;
      }
      if (messages) {
        this.messages = messages;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  setUpMessagesSubscription = async (messages) => {
    await this.getMessages();
    await this.supabase.setUpMessagesSubscription(this.messages);
  };
}
