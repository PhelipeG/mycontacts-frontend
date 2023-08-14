class CategoryMapper {
  // eslint-disable-next-line class-methods-use-this
  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}
export default new CategoryMapper();
