import HttpClient from './clientHttp/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoryService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:9999');
  }

  async listCategories() {
    const categories = await this.HttpClient.get('/categories');
    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoryService();
