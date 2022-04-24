/* eslint-disable @typescript-eslint/member-ordering */
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
  users = [];

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

  username(userId) {
    const user = this.users[userId];
    if (!user) {
      return '';
    }
    return user.username ? user.username : 'New Account';
  }

  isUser(messageId) {
    if (messageId === this.supabase.session.user.id) {
      return true;
    } else {
      return false;
    }
  }

  async getUsers() {
    const userIds = new Set(this.messages.map((message) => message.user_id));
    const newUsers = await this.supabase.getUsersFromSupabase(
      this.users,
      userIds
    );
    this.users = newUsers;
    console.log('users is ', this.users);
  }

  setUpMessagesSubscription = async (messages) => {
    await this.getMessages();
    await this.supabase.setUpMessagesSubscription(this.messages);
    await this.getUsers();
  };
}
