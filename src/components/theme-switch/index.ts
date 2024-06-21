import template from './template.html?raw';
import styles from './styles.module.scss';
import { addModuleStyles } from '../../lib/helpers/style-helpers';
import SunIcon from '../../icons/sun.svg?raw';
import MoonIcon from '../../icons/moon.svg?raw';

const componentTemplate = addModuleStyles(
  template.replace('{sun}', SunIcon).replace('{moon}', MoonIcon),
  styles
);

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
    this.innerHTML = componentTemplate;

    this.switch = document.getElementsByClassName(
      styles.themeSwitch
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
