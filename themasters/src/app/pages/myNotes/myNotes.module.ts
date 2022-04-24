import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyNotesPageRoutingModule } from './myNotes-routing.module';
import { MyNotesPage } from './myNotes.page';
import { NoteformComponent } from './noteform/noteform.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyNotesPageRoutingModule,
  ],
  declarations: [MyNotesPage, NoteformComponent],
})
export class NotesPageModule {}
