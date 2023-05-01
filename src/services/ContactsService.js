import HttpClient from "./clientHttp/HttpClient"

class ContactsService{

  constructor(){
    this.HttpClient = new HttpClient('http://localhost:5000')
  }

  async listContacts(orderBy = 'asc'){
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`)
  }
  async createContact(contact){
    return this.HttpClient.post('/contacts',contact)
  }
}

export default new ContactsService()
