class LoginForm extends AsyncForm {
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.setState('user-logged');
        const modal = App.getModal('login');
        modal.close();
      } else {
        console.error(err || response.error);
      }
    });
  }
}