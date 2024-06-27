import * as actions from '../../stores/game/actions';
import DownIcon from 'feather-icons/dist/icons/chevron-down.svg?raw';
import { SET_GAME_LOADING_ACTION } from '../../stores/game/constants';

const sudokuActions = actions as unknown as { [a: string]: () => void };

class ActionButton extends HTMLElement {
  private menu: string | null = null;
  private action: string | null = null;
  private button: HTMLButtonElement = document.createElement('button');
  private hasClickedButton = false;

  private onButtonClick = () => {
    if (this.button.ariaDisabled === 'true') return;

    this.hasClickedButton = true;

    if (this.menu && this.button) {
      this.button.ariaExpanded =
        this.button.ariaExpanded === 'true' ? 'false' : 'true';
    }
    if (this.action) {
      sudokuActions[this.action]();
    }
  };

  private onDocumentClick = () => {
    if (this.hasClickedButton) {
      this.hasClickedButton = false;
    } else if (this.button) {
      this.button.ariaExpanded = 'false';
    }
  };

  private setLoading = () => {
    if (actions.state.loading) {
      this.button.ariaDisabled = 'true';
      this.button.ariaExpanded = 'false';
    } else {
      this.button.ariaDisabled = 'false';
    }
  };

  connectedCallback() {
    this.action = this.getAttribute('action');
    this.menu = this.getAttribute('menu');

    this.role = 'presentation';

    this.button = document.createElement('button');
    this.button.role = 'menuitem';
    this.button.ariaDisabled = 'false';
    if (this.menu) {
      this.button.ariaHasPopup = 'true';
      this.button.setAttribute('aria-controls', this.menu);
      this.button.ariaExpanded = 'false';
    }

    window.addEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    this.button.addEventListener('click', this.onButtonClick);
    if (this.menu) {
      document.addEventListener('click', this.onDocumentClick);
    }

    this.button.innerHTML = this.innerHTML + (this.menu ? DownIcon : '');

    this.replaceChildren(this.button);
  }

  disconnectedCallback() {
    window.removeEventListener(SET_GAME_LOADING_ACTION, this.setLoading);
    this.button.removeEventListener('click', this.onButtonClick);
    if (this.menu) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }
}

export default ActionButton;
