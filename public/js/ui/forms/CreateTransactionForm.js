class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response && response.success) {
        const select = this.element.querySelector('.accounts-select');
        select.innerHTML = '';
        response.data.forEach(account => {
          const optionHTML = `<option value="${account.id}">${account.name}</option>`;
          select.insertAdjacentHTML('beforeend', optionHTML);
        });
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