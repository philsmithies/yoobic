/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface StarWarsMaster {
  name: string;
  height: number;
  mass: number;
  gender: string;
  wiki: string;
  image: string;
  born: string;
  species: string;
}
export interface Profile {
  username: string;
  avatar_url: string;
  bio: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  get profile() {
    return this.supabase
      .from('user')
      .select(`username, avatar_url, bio`)
      .eq('id', this.user?.id)
      .single();
  }

  get starWarsApi() {
    return this.supabase.from('starwars').select('*');
  }

  get profiles() {
    return this.supabase.from('user').select(`username, avatar_url, bio`);
  }

  /**
   * duplicated code here
   */

  getSession(): Session | null {
    return this.supabase.auth.session();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async signIn(email: string, password: string) {
    const { user, session, error } = await this.supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  }

  async signUp(userEmail: string, userPassword: string) {
    console.log('user is', userEmail, userPassword);
    const { user, session, error } = await this.supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    });
    if (error) {
      throw error;
    }
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date(),
    };

    return this.supabase.from('user').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 });
    await toast.present();
  }

  createLoader() {
    return this.loadingCtrl.create();
  }

  fetchNotes() {
    return this.supabase
      .from('todos')
      .select('*')
      .eq('user_id', this.user?.id)
      .order('id', { ascending: false });
  }

  addNote(note: string) {
    const userId = this.getSession()?.user?.id as string;

    return this.supabase
      .from('todos')
      .insert({ task: note, user_id: userId })
      .single();
  }

  deleteNote(id: string) {
    return this.supabase.from('todos').delete().eq('id', id);
  }

  addVote(characterId: string) {
    const userId = this.getSession()?.user?.id as string;
    console.log('user id is', userId);
    console.log('char id is', characterId);
    return this.supabase
      .from('votes')
      .insert({ characterId, user_id: userId, vote: 1 })
      .single();
    /**
     * add a vote and can't add if tyhe user id is already present
     */
  }

  starWarsProfile(id) {
    return this.supabase.from('starwars').select('*').eq('id', id).single();
  }
}
