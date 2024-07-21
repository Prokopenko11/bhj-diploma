class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response && response.success) {
        const select = this.element.querySelector('.accounts-select');
        const optionsHTML = response.data.reduce((acc, account) => {
          return acc + `<option value="${account.id}">${account.name}</option>`;
        }, '');
        select.innerHTML = optionsHTML;
      } else {
        console.error(err || response.error);
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal(this.element.closest('.modal').dataset.modalId).close();
        App.update();
      } else {
        console.error(err || response.error);
      }
    });
  }
}