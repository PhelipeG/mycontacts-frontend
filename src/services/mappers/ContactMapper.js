/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
class ContactMapper {
  toPersistence(domainContact) {
    return {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    };
  }

  //   toMain(persistenceContact) {
  //     return {};
  //   }
}
export default new ContactMapper();
