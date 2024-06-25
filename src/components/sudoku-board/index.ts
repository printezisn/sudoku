import styles from './styles.module.scss';

class SudokuBoard extends HTMLElement {
  connectedCallback() {
    this.classList.add(styles.board);

    const inner = document.createElement('div');
    inner.classList.add(styles.inner);

    for (let i = 0; i < 9; i++) {
      const group = document.createElement('div');

      for (let j = 0; j < 9; j++) {
        const row = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        const col = (i % 3) * 3 + (j % 3);

        const cell = document.createElement('app-sudoku-cell');
        cell.setAttribute('row', row.toString());
        cell.setAttribute('col', col.toString());

        group.appendChild(cell);
      }

      inner.appendChild(group);
    }

    this.appendChild(inner);
  }
}

export default SudokuBoard;
