class UserWidget {
  constructor(element){
    if (element) {
      this.element = element;
    } else {
      throw new Error('Элемент не был передан')
    }
  }

  update(){
    const currentUser = User.current();
    if (currentUser) {
      const userName = this.element.querySelector('.user-name');
      userName.textContent = currentUser.name;
    }
  }
}
