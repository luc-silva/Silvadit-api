export const createForumOutput = (
  data?: Partial<IForumOutput>,
): IForumOutput => {
  return {
    banned: false,
    dateCreated: new Date(),
    dateEdited: new Date(),
    description: 'lorem lorem',
    forumId: '123',
    name: 'Teste',
    ...data,
  };
};

export const createForum = (data?: Partial<IForum>): IForum => {
  return {
    banned: 'S',
    dateCreated: new Date(),
    dateEdited: new Date(),
    description: 'Lorem',
    forumId: '123',
    name: 'testeee',
    ...data,
  };
};
