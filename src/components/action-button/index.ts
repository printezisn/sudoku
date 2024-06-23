import DownIcon from 'feather-icons/dist/icons/chevron-down.svg?raw';

class ActionButton extends HTMLElement {
  private menu: string | null = null;
  private action: string | null = null;
  private button: HTMLButtonElement | null = null;
  private hasClickedButton = false;

  private onButtonClick = () => {
    this.hasClickedButton = true;

    if (this.menu && this.button) {
      this.button.ariaExpanded =
        this.button.ariaExpanded === 'true' ? 'false' : 'true';
    }
    if (this.action) {
      //TODO
      console.log(this.action);
    }
  };

  private onDocumentClick = () => {
    if (this.hasClickedButton) {
      this.hasClickedButton = false;
    } else if (this.button) {
      this.button.ariaExpanded = 'false';
    }
  };

  connectedCallback() {
    this.action = this.getAttribute('action');
    this.menu = this.getAttribute('menu');

    this.role = 'presentation';

    this.button = document.createElement('button');
    this.button.role = 'menuitem';
    if (this.menu) {
      this.button.ariaHasPopup = 'true';
      this.button.setAttribute('aria-controls', this.menu);
      this.button.ariaExpanded = 'false';
    }

    this.button.addEventListener('click', this.onButtonClick);
    if (this.menu) {
      document.addEventListener('click', this.onDocumentClick);
    }

    this.button.innerHTML = this.innerHTML + (this.menu ? DownIcon : '');

    this.replaceChildren(this.button);
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', this.onButtonClick);
    if (this.menu) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }
}

export default ActionButton;
