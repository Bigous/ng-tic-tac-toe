import { Injectable } from '@angular/core';
import { BoardComponent } from './board/board.component';

interface CompulerRole {
  name: string;
  func: Function;
}

interface ComputerLevel {
  name: string;
  sequence: Array<CompulerRole>;
}

@Injectable()
export class ComputerService {
  board: BoardComponent = null;
  levels: Array<ComputerLevel> = [];
  level: ComputerLevel;

  constructor() {
    this.levels.push({
      name: 'Human',
      sequence: []
    });
    this.levels.push({
      name: 'Computer Newbie',
      sequence: [
        {
          name: 'Any',
          func: this.getAny.bind(this)
        }
      ]
    });
    this.levels.push({
      name: 'Computer Weak',
      sequence: [
        { name: 'Winning', func: this.getWinning.bind(this) },
        { name: 'Loosing', func: this.getLoosing.bind(this) },
        { name: 'Any', func: this.getAny.bind(this) }
      ]
    });
    this.levels.push({
      name: 'Computer Average',
      sequence: [
        { name: 'Winning', func: this.getWinning.bind(this) },
        { name: 'Loosing', func: this.getLoosing.bind(this) },
        { name: 'Middle', func: this.getMiddle.bind(this) },
        { name: 'getAnyCorner', func: this.getAnyCorner.bind(this) },
        { name: 'Any', func: this.getAny.bind(this) }
      ]
    });
    this.levels.push({
      name: 'Computer Good',
      sequence: [
        { name: 'Winning', func: this.getWinning.bind(this) },
        { name: 'Loosing', func: this.getLoosing.bind(this) },
        { name: 'Middle', func: this.getMiddle.bind(this) },
        { name: 'AnyCorner', func: this.getAnyCorner.bind(this) },
        { name: 'getCenterCornerTrap', func: this.getCenterCornerTrap.bind(this) },
        { name: 'CornerTrap', func: this.getCornerTrap.bind(this) },
        { name: 'Any', func: this.getAny.bind(this) }
      ]
    });
    this.levels.push({
      name: 'Computer Expert',
      sequence: [
        { name: 'Winning', func: this.getWinning.bind(this) },
        { name: 'Loosing', func: this.getLoosing.bind(this) },
        { name: 'Middle', func: this.getMiddle.bind(this) },
        { name: 'AnyCorner', func: this.getAnyCorner.bind(this) },
        { name: 'getCenterCornerTrap', func: this.getCenterCornerTrap.bind(this) },
        { name: 'CornerTrap', func: this.getCornerTrap.bind(this) },
        { name: 'MiddleCornerTrap', func: this.getMiddleCornerTrap.bind(this) },
        { name: 'DoubleMiddleTrap', func: this.getDoubleMiddleTrap.bind(this) },
        { name: 'Any', func: this.getAny.bind(this) }
      ]
    });
    this.level = this.levels[0];
  }

  setBoard(board: BoardComponent) {
    this.board = board;
  }

  getAny(): number {
    const takens = this.board.takens.map((e, i) => e === '' ? i : null).filter(e => e !== null);
    return takens[Math.floor(Math.random() * (takens.length - 0.00001))];
    // for (; ; ) {
    //   const pick = Math.floor(Math.random() * 8.9999);
    //   if (takens[pick] === '') {
    //     return pick;
    //   }
    // }
  }

  getMiddle(): number {
    if (this.board.takens[4] === '') {
      return 4;
    }
  }

  getWinning(): number {
    const im = this.board.vez;
    const myMoves = this.board.ptakes[im];
    const takens = this.board.takens;

    // Se estou pra ganhar, ganho
    let gotIt;
    for (let iWinCase = 0; iWinCase < this.board.winIf.length; iWinCase++) {
      const winCase = this.board.winIf[iWinCase];
      if ((gotIt = winCase.filter(e => myMoves.indexOf(e) < 0)).length === 1 && takens[gotIt[0]] === '') {
        return gotIt[0];
      }
    }
  }

  getLoosing(): number {
    const im = this.board.vez;
    const otherMoves = this.board.ptakes[(im + 1) % 2];
    const takens = this.board.takens;

    let gotIt;
    for (let iLooseCase = 0; iLooseCase < this.board.winIf.length; iLooseCase++) {
      const looseCase = this.board.winIf[iLooseCase];
      if ((gotIt = looseCase.filter(e => otherMoves.indexOf(e) < 0)).length === 1 && takens[gotIt[0]] === '') {
        return gotIt[0];
      }
    }
  }

  getAnyCorner(): number {
    const corners = [0, 2, 6, 8];
    const takens = this.board.takens;
    const qtdMoves = takens.filter(e => e !== '').length;

    // Se for o segundo movimento e o meio está ocupado, pega um canto. Por que se não pegar, é matematicamente possível perder.
    if (qtdMoves === 1) {
      // Escolha 1 canto.
      return corners[Math.floor(Math.random() * 3.9999)];
    }
  }

  getCenterCornerTrap(): number {
    const corners = [0, 2, 6, 8];
    const opositeCorners = [8, null, 6, null, null, null, 2, null, 0];
    const im = this.board.vez;
    const myMoves = this.board.ptakes[im];
    const otherMoves = this.board.ptakes[(im + 1) % 2];
    const takens = this.board.takens;
    const qtdMoves = takens.filter(e => e !== '').length;

    if (qtdMoves === 3) {
      const myCorner = myMoves[0];
      const opositeCorner = opositeCorners[myCorner];
      if (otherMoves.indexOf(4) >= 0 && otherMoves.indexOf(opositeCorner) >= 0) {
        const usedCorners = [myCorner, opositeCorner];
        return corners.filter(e => usedCorners.indexOf(e) < 0)[Math.floor(Math.random() * 1.9999)];
      }
    }
  }

  getCornerTrap(): number {
    const middles = [1, 3, 5, 7];
    const takens = this.board.takens;
    const qtdMoves = takens.filter(e => e !== '').length;

    // Se for um movimento maior que o segundo e nenhum meio foi escolhido, possível corner trap.
    if (qtdMoves > 2 && takens[1] === '' && takens[3] === '' && takens[5] === '' && takens[7] === '') {
      // Escolha um meio.
      return middles[Math.floor(Math.random() * 3.9999)];
    }
  }

  getMiddleCornerTrap(): number {
    const middles = [1, 3, 5, 7];
    const corners = [0, 2, 6, 8];
    const opositeMidles = [null , 7, null, 5, null, 3, null, 1, null];
    const adjacentMidles = [[1, 3], [], [1, 5], [], [1, 3, 5, 7], [], [3, 7], [], [5, 7]];
    const im = this.board.vez;
    const myMoves = this.board.ptakes[im];
    const otherMoves = this.board.ptakes[(im + 1) % 2];
    const takens = this.board.takens;
    const qtdMoves = takens.filter(e => e !== '').length;

    // Armadilha meio, canto.
    if (qtdMoves === 3) {
      const otherMiddle = otherMoves.filter(e => middles.indexOf(e) >= 0);
      const otherCorners = otherMoves.filter(e => corners.indexOf(e) >= 0);
      if (otherMiddle.length === 1 && otherCorners.length === 1) {
        // Já passamos pela regra do Loosing, logo o meio e o canto são opostos.
        // Podemos travar selecionando o meio que não é oposto ao meio já selecionado e que seja oposto ao canto selecionado.
        const om = opositeMidles[otherMiddle[0]];
        const adj = adjacentMidles[otherCorners[0]].filter(e => e !== om);
        return opositeMidles[adj[0]];
      }
    }
  }

  getDoubleMiddleTrap(): number {
    const middles = [1, 3, 5, 7];
    const adjacentMidles = [[1, 3], [], [1, 5], [], [1, 3, 5, 7], [], [3, 7], [], [5, 7]];
    const im = this.board.vez;
    const myMoves = this.board.ptakes[im];
    const otherMoves = this.board.ptakes[(im + 1) % 2];
    const takens = this.board.takens;
    const qtdMoves = takens.filter(e => e !== '').length;

    // Armadilha meio, meio.
    if (qtdMoves === 3) {
      const otherMiddle = otherMoves.filter(e => middles.indexOf(e) >= 0);
      if (otherMiddle.length === 2) {
        // Se foram 2 meios, não deixar eles pegarem o canto
        for (let i = 0; i < adjacentMidles.length; i++) {
          if (adjacentMidles[i].length === 2) {
            if (adjacentMidles[i].filter(e => otherMiddle.indexOf(e) >= 0).length === 2) {
              if (takens[i] === '') {
                return i;
              }
            }
          }
        }
      }
    }
  }

  play(): number {
    let pick;
    for (let i = 0; i < this.level.sequence.length; i++) {
      pick = this.level.sequence[i].func();
      if (pick !== undefined) {
        console.log(this.level.name, this.level.sequence[i].name, pick);
        return pick;
      }
    }
  }

  processMovement(): number {
    if (this.board.won || this.board.velha || !this.level) {
      return;
    }
    return this.play();
  }
}
