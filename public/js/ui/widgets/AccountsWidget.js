class AccountsWidget {
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не был передан');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const createAccountButton = this.element.querySelector('.create-account');
    createAccountButton.addEventListener('click', () => {
      App.getModal('createAccount').open();
    });

    this.element.addEventListener('click', (event) => {
      const account = event.target.closest('.account');
      if (account) {
        this.onSelectAccount(account);
      }
    });
  }

  update() {
    const currentUser = User.current();
    if (currentUser) {
      Account.list(currentUser, (err, response) => {
        if (response && response.success) {
          this.clear();
          response.data.forEach(account => {
            this.renderItem(account);
          });
        } else {  
          console.error(err || response.error);
        }
      });
    }
  }

  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(account => account.remove());
  }

  onSelectAccount(element) {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(account => {
      account.classList.remove('active');
    });
    element.classList.add('active');
    App.showPage('transactions', {account_id: element.dataset.id});
  }

  getAccountHTML(item){
    return `
    <li class="account" data-id="${item.id}">
      <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
      </a>
    </li>
    `;
  }

  renderItem(data){
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}