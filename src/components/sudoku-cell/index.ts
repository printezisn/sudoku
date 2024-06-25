import { state } from '../../stores/game/actions';
import styles from './styles.module.scss';

class SudokuCell extends HTMLElement {
  private row: number = 0;
  private col: number = 0;
  private index: number = 0;
  private button: HTMLButtonElement = document.createElement('button');

  private update() {
    this.button.classList.toggle(
      styles.initial,
      state.board.cells[this.index].initial
    );
    this.button.innerHTML =
      state.board.cells[this.index].value?.toString() ?? '';
  }

  connectedCallback() {
    this.row = Number(this.getAttribute('row'));
    this.col = Number(this.getAttribute('col'));
    this.index = this.row * 9 + this.col;

    this.button.classList.add(styles.cell);
    this.button.ariaLabel = `Sudoku cell row ${this.row + 1} and column ${
      this.col + 1
    }`;
    this.appendChild(this.button);

    this.update();
  }
}

export default SudokuCell;
