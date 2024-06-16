const initThemeSwitch = () => {
  const themeSwitch = document.getElementsByClassName(
    'theme-switch'
  )[0] as HTMLButtonElement;

  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  if (theme === 'dark') {
    themeSwitch.ariaChecked = 'true';
  }

  themeSwitch.addEventListener('click', () => {
    themeSwitch.ariaChecked =
      themeSwitch.ariaChecked === 'true' ? 'false' : 'true';
    localStorage.setItem(
      'theme',
      themeSwitch.ariaChecked === 'true' ? 'dark' : 'light'
    );
  });
};

export default initThemeSwitch;
