import HttpClient from './clientHttp/HttpClient';

class CategoryService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:9999');
  }

  async listCategories() {
    return this.HttpClient.get('/categories');
  }
}

export default new CategoryService();
