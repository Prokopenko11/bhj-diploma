class Modal {
  constructor(element){
    if (element) {
      this.element = element;
    } else {
      throw new Error('Элемент не был передан');
    }

    this.registerEvents();
  }

  registerEvents() {
    const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeButtons.forEach(button => {
        button.addEventListener('click', e => this.onClose(e));
    });
  }

  onClose(e) {
    e.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close(){
    this.element.style.display = 'none';
  }
}