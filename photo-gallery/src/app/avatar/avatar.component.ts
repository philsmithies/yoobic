/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SupabaseService } from '../services/supabase.service';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar_wrapper" (click)="uploadAvatar()">
      <img *ngIf="_avatarUrl; else noAvatar" [src]="_avatarUrl" />
      <ng-template #noAvatar>
        <ion-icon name="person" class="no-avatar"></ion-icon>
      </ng-template>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin: auto;
        min-height: 150px;
      }
      :host .avatar_wrapper {
        margin: 16px auto 16px;
        border-radius: 50%;
        overflow: hidden;
        height: 150px;
        aspect-ratio: 1;
        background: var(--ion-color-step-50);
        border: thick solid var(--ion-color-step-200);
      }
      :host .avatar_wrapper:hover {
        cursor: pointer;
      }
      :host .avatar_wrapper ion-icon.no-avatar {
        width: 100%;
        height: 115%;
      }
      :host img {
        display: block;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class AvatarComponent implements OnInit {
  _avatarUrl: SafeResourceUrl | undefined;
  uploading = false;

  @Input()
  set avatarUrl(url: string | undefined) {
    if (url) {
      this.downloadImage(url);
    }
  }

  @Output() upload = new EventEmitter<string>();

  constructor(
    private readonly supabase: SupabaseService,
    private readonly dom: DomSanitizer
  ) {}

  ngOnInit() {}

  async downloadImage(path: string) {
    try {
      const { data } = await this.supabase.downLoadImage(path);
      this._avatarUrl = this.dom.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(data)
      );
    } catch (error) {
      console.error('Error downloading image: ', error.message);
    }
  }

  async uploadAvatar() {
    const loader = await this.supabase.createLoader();
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
      });

      const file = await fetch(photo.dataUrl)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new File([blob], 'my-file', { type: `image/${photo.format}` })
        );

      const fileName = `${Math.random()}-${new Date().getTime()}.${
        photo.format
      }`;

      await loader.present();
      await this.supabase.uploadAvatar(fileName, file);

      this.upload.emit(fileName);
    } catch (error) {
      this.supabase.createNotice(error.message);
    } finally {
      loader.dismiss();
    }
  }
}
