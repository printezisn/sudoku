import template from './template.html?raw';

class ThemeSwitch extends HTMLElement {
  private switch: HTMLButtonElement | null = null;

  private onSwitchChange = () => {
    if (!this.switch) return;

    this.switch.ariaChecked =
      this.switch.ariaChecked === 'true' ? 'false' : 'true';

    document.documentElement.setAttribute(
      'data-theme',
      this.switch.ariaChecked === 'true' ? 'dark' : 'light'
    );
    localStorage.setItem(
      'theme',
      this.switch.ariaChecked === 'true' ? 'dark' : 'light'
    );
  };

  connectedCallback() {
    this.innerHTML = template;

    this.switch = document.getElementsByClassName(
      'theme-switch'
    )[0] as HTMLButtonElement;

    let theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    if (theme === 'dark') {
      this.switch.ariaChecked = 'true';
    }

    this.switch.addEventListener('click', this.onSwitchChange);
  }

  disconnectedCallback() {
    this.switch?.removeEventListener('click', this.onSwitchChange);
  }
}

export default ThemeSwitch;
