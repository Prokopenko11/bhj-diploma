class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal('createAccount').close();
        App.update();
      } else {
        console.error(err || response.error);
      }
    });
  }
}