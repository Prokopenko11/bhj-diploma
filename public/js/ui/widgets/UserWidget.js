class UserWidget {
  constructor(element){
    if (!element) {
      throw new Error('Элемент не был передан');
    }
    this.element = element;
  }

  update(){
    const currentUser = User.current();
    if (currentUser) {
      const userName = this.element.querySelector('.user-name');
      userName.textContent = currentUser.name;
    }
  }
}
