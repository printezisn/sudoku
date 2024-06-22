class ActionButton extends HTMLElement {
  private menu: string | null = null;
  private action: string | null = null;
  private button: HTMLButtonElement | null = null;

  private onClick = () => {
    if (this.menu && this.button) {
      this.button.ariaExpanded =
        this.button.ariaExpanded === 'true' ? 'false' : 'true';
    }
    if (this.action) {
      //TODO
      console.log(this.action);
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

    this.button.addEventListener('click', this.onClick);
    this.button.innerHTML = this.innerHTML;

    this.replaceChildren(this.button);
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', this.onClick);
  }
}

export default ActionButton;
