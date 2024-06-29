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
  private dropdown: HTMLElement = document.createElement('div');
  private hasClickedButton = false;

  private update = () => {
    this.button.classList.toggle(
      styles.initial,
      state.board.cells[this.index].initial
    );
    this.button.classList.toggle(styles.finished, state.board.finished);
    this.button.ariaLabel = this.getButtonLabel();
    this.button.innerHTML =
      state.board.cells[this.index].value?.toString() ?? '';

    if (state.board.cells[this.index].initial) {
      this.button.ariaExpanded = null;
      this.button.ariaHasPopup = null;
      this.button.removeAttribute('aria-controls');
    } else {
      this.button.ariaExpanded = 'false';
      this.button.ariaHasPopup = 'true';
      this.button.setAttribute('aria-controls', this.dropdown.id);
    }
  };

  private onButtonClick = () => {
    if (
      this.button.ariaDisabled === 'true' ||
      this.button.ariaExpanded == null ||
      this.button.ariaExpanded === 'true'
    ) {
      return;
    }

    this.hasClickedButton = true;

    [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((value) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.role = 'option';
      option.ariaDisabled =
        value === null || state.board.cells[this.index].options.has(value)
          ? 'false'
          : 'true';
      option.ariaSelected =
        state.board.cells[this.index].value === value ? 'true' : 'false';
      option.innerHTML = value === null ? '-' : value.toString();

      this.dropdown.appendChild(option);
    });

    this.button.ariaExpanded = 'true';
  };

  private onDocumentClick = () => {
    if (this.hasClickedButton) {
      this.hasClickedButton = false;
    } else if (this.button.ariaExpanded === 'true') {
      this.button.ariaExpanded = 'false';
      this.dropdown.innerHTML = '';
    }
  };

  private setLoading = async () => {
    this.button.ariaDisabled = state.loading ? 'true' : 'false';
  };

  private getButtonLabel = () => {
    const value = state.board.cells[this.index].value;
    if (value == null) {
      return `Sudoku cell row ${this.row + 1} and column ${
        this.col + 1
      }. No number selected. Click to select a number.`;
    }

    return `Sudoku cell row ${this.row + 1} and column ${
      this.col + 1
    }. ${value} is selected. Click to select another number.`;
  };

  private initButton = () => {
    this.button.id = `sudoku-cell-${this.row}-${this.col}`;
    this.button.type = 'button';
    this.button.ariaDisabled = 'false';

    this.appendChild(this.button);
  };

  private initDropdown = () => {
    this.dropdown.id = `sudoku-cell-dropdown-${this.row}-${this.col}`;
    this.dropdown.role = 'listbox';
    this.dropdown.ariaLabel = 'Cell options';
    this.dropdown.classList.toggle(styles.right, this.col > 4);

    this.appendChild(this.dropdown);
  };

  connectedCallback() {
    this.classList.add(styles.cell);

    this.row = Number(this.getAttribute('row'));
    this.col = Number(this.getAttribute('col'));
    this.index = this.row * 9 + this.col;

    this.initButton();
    this.initDropdown();

    this.update();

    window.addEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    window.addEventListener(UPDATE_BOARD_ACTION, this.update);
    this.button.addEventListener('click', this.onButtonClick);
    window.addEventListener('click', this.onDocumentClick);
  }

  disconnectedCallback() {
    window.removeEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    window.removeEventListener(UPDATE_BOARD_ACTION, this.update);
    this.button.removeEventListener('click', this.onButtonClick);
    window.removeEventListener('click', this.onDocumentClick);
  }
}

export default SudokuCell;
