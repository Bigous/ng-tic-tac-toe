import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  players = ['x', 'o'];
  winIf = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  vez = 0;

  takens: Array<string>;
  ptakes: Array<Array<number>>;
  won: { player: number; case: Array<number> } = null;
  velha = false;

  constructor() {}

  clicked(id: number) {
    if (this.won || this.velha) {
      this.clear();
    } else if (this.takens[id] === '') {
      this.processMovement(id);
    }
  }

  clear() {
    this.ptakes = new Array<Array<number>>(
      new Array<number>(),
      new Array<number>()
    );
    this.takens = new Array<string>('', '', '', '', '', '', '', '', '');
    this.won = null;
    this.velha = false;
  }

  processMovement(id: number) {
    // pega a casa
    this.takens[id] = this.players[this.vez];
    this.ptakes[this.vez].push(id);

    // Anyone won?
    if ((this.won = this.checkWin())) {
      console.log('Ganhou:', this.won);
    }

    this.velha = this.takens.filter(e => e === '').length === 0;

    // vez do próximo
    this.vez += 1;
    this.vez %= 2;
  }

  checkWin(): { player: number; case: Array<number> } {
    for (let player = 0; player < this.ptakes.length; player++) {
      const takes = this.ptakes[player];
      for (let iWinCase = 0; iWinCase < this.winIf.length; iWinCase++) {
        const winCase = this.winIf[iWinCase];
        if (winCase.filter(e => takes.indexOf(e) >= 0).length === 3) {
          return { player: player, case: winCase };
        }
      }
    }
    return;
  }

  ngOnInit() {
    this.clear();
  }
}
