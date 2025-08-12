export const createSessionMock = (data?: Partial<ISession>): ISession => {
  return { date_issued: new Date(), email: "Teste@teste.com", id:"123", expiration: "7d", ...data };
};
