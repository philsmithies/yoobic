/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages = [];
  users = [];
  messageForm: FormGroup = new FormGroup({
    message: new FormControl(),
  });
  errorText: string | undefined | null;

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
    return user.username ? user.username : 'New Account';
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

  async sendMessage(): Promise<void> {
    let messageText = this.messageForm.value.message.trim();
    console.log('message text is ', messageText);
    let { data: message, error } = await this.supabase.sendMessage(messageText);
    if (error) {
      this.errorText = error.message;
    } else {
      this.errorText = null;
      this.messageForm.reset();
    }
  }

  /**
   * TODO bad logic
   */

  setUpMessagesSubscription = async (messages) => {
    await this.getMessages();
    await this.supabase.setUpMessagesSubscription(this.messages);
    await this.getUsers();
  };
}
