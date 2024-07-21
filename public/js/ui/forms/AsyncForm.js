class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не был передан');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', e => {
      e.preventDefault();
      this.submit();
    })
  }

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options){

  }

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}