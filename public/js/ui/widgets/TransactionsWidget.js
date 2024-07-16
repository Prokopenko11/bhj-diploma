class TransactionsWidget {
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не был передан');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const createIncomeButton = this.element.querySelector('.create-income-button');
    const createExpenseButton = this.element.querySelector('.create-expense-button');

    createIncomeButton.addEventListener('click', () => {
      App.getModal('newIncome').open();
    });

    createExpenseButton.addEventListener('click', () => {
      App.getModal('newExpense').open();
    });
  }
}
