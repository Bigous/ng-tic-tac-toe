import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';

import { ComputerService } from './computer.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ComputerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
