class Entity {
  static URL = '';

  static list(data, callback){
    createRequest({
      url: this.URL,
      data,
      method: 'GET',
      callback: callback,
    });
  }

  static create(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'PUT',
      callback: callback,
    });
  }

  static remove(data, callback ) {
    createRequest({
      url: this.URL,
      data,
      method: 'DELETE',
      callback: callback,
    });
  }
}
