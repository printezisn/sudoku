import { state } from '../../stores/game/actions';
import {
  SET_GAME_LOADING_ACTION,
  UPDATE_BOARD_ACTION,
} from '../../stores/game/constants';
import styles from './styles.module.scss';

class SudokuCell extends HTMLElement {
  private row = 0;
  private col = 0;
  private index = 0;
  private button: HTMLButtonElement = document.createElement('button');

  private update = () => {
    this.button.classList.toggle(
      styles.initial,
      state.board.cells[this.index].initial
    );
    this.button.innerHTML =
      state.board.cells[this.index].value?.toString() ?? '';
  };

  private setLoading = async () => {
    this.button.classList.toggle(styles.loading, state.loading);
  };

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

    window.addEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    window.addEventListener(UPDATE_BOARD_ACTION, this.update);
  }

  disconnectedCallback() {
    window.removeEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    window.removeEventListener(UPDATE_BOARD_ACTION, this.update);
  }
}

export default SudokuCell;
