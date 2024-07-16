class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const menuButton = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body');

    menuButton.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  static initAuthLinks() {
    const registerButton = document.querySelector('.menu-item_register');
    registerButton.addEventListener('click', () => {
      const modalRegister = App.getModal('register');
      modalRegister.open();
    });

    const loginButton = document.querySelector('.menu-item_login');
    loginButton.addEventListener('click', () => {
      const modalLogin = App.getModal('login');
      modalLogin.open();
    });

    const logoutButton = document.querySelector('.menu-item_logout');
    logoutButton.addEventListener('click', () => {
      User.logout((err, response) => {
        if (response && response.success) {
          App.setState('init');
        } else {
          console.error(err || response.error);
        }
      });
    });
  }
}