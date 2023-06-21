import HttpClient from './clientHttp/HttpClient';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:5000');
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
    return this.HttpClient.post('/contacts', { body: contact });
  }

  updateContact(id, contact) {
    return this.HttpClient.put(`/contacts/${id}`, { body: contact });
  }

  deleteContact(id) {
    return this.HttpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
