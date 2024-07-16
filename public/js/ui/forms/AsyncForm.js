class AsyncForm {
  constructor(element) {
    if (element) {
      this.element = element;
    } else {
      throw new Error('Элемент не был передан');
    }

    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', e => {
      e.preventDefault();
      this.submit();
    })
  }

  getData() {
    const inputs = this.element.querySelectorAll('input');
    const data = {};
    inputs.forEach(input => {
        if (input.name) {
            data[input.name] = input.value;
        }
    });
    return data;
  }

  onSubmit(options){

  }

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}