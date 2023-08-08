import HttpClient from './clientHttp/HttpClient';
import ContactMapper from './mappers/ContactMapper';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:9999');
  }

  listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`, {
      headers: {
        Authorization: 'Meu Token',
      },
    });
  }

  getcontactById(id) {
    return this.HttpClient.get(`/contacts/${id}`);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.HttpClient.post('/contacts', { body });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.HttpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.HttpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
