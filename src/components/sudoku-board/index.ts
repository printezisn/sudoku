import styles from './styles.module.scss';

class SudokuBoard extends HTMLElement {
  connectedCallback() {
    this.classList.add(styles.board);

    const inner = document.createElement('div');
    inner.classList.add(styles.inner);

    for (let i = 0; i < 9; i++) {
      const group = document.createElement('div');

      for (let j = 0; j < 9; j++) {
        const cell = document.createElement('div');
        cell.classList.add(styles.cell);

        group.appendChild(cell);
      }

      inner.appendChild(group);
    }

    this.appendChild(inner);
  }
}

export default SudokuBoard;
