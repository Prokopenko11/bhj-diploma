class TransactionsPage {
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не был передан');
    }
    this.element = element;
    this.registerEvents();
  }

  update() {
    this.render();
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      const removeAccountBtn = event.target.closest('.remove-account');
      if (removeAccountBtn) {
        this.removeAccount();
      }

      const removeTransactionBtn = event.target.closest('.transaction__remove');
      if (removeTransactionBtn) {
        const id = removeTransactionBtn.dataset.id;
        this.removeTransaction(id);
      }
    });
  }

  removeAccount() {
    if (this.lastOptions) {
      if (confirm('Вы действительно хотите удалить счёт?')) {
        Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
          if (response && response.success) {
            App.updateWidgets();
            App.updateForms();
            this.clear();
          } else {
            console.error(err || response.error);
          }
        });
      }
    }
  }

  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove({id}, (err, response) => {
        if (response && response.success) {
          App.update();
        } else {
          console.error(err || response.error);
        }
      });
    }
  }

  render(options){
    if (!options) {
      return;
    }

    this.lastOptions = options;
    Account.get(options.account_id, (err, response) => {
      if (response && response.success) {
        this.renderTitle(response.data.name);
      } else {
        console.error(err || response.error);
      }
    });

    Transaction.list(options, (err, response) => {
      if (response && response.success) {
        this.renderTransactions(response.data);
      } else {
        console.error(err || response.error);
      }
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name){
    const title = this.element.querySelector('.content-title');
    title.textContent = name;
  }

  formatDate(date){
    const dateObj = new Date(date);
  
    const day = dateObj.getDate();
    const monthNames = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} г. в ${hours}:${minutes}`;
  }

  getTransactionHTML(item){
    const date = this.formatDate(item.created_at);
    const type = item.type === 'income' ? 'transaction_income' : 'transaction_expense';

    return `
      <div class="transaction ${type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${date}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>
    `;
  }

  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    const transactionsHTML = data.reduce((acc, item) => {
      return acc + this.getTransactionHTML(item);
    }, '');
    content.innerHTML = transactionsHTML;
    console.log('Transactions rendered:', data);
  }
}