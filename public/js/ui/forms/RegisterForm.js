class RegisterForm extends AsyncForm {
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.setState('user-logged');
        const modal = App.getModal('register');
        modal.close();
      } else {
        console.error(err || response.error);
      }
    });
  }
}