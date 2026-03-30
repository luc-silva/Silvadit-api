export const createOrderParams = (data?: Partial<IOrder>): IOrder => {
  return {
    orderDirection: 'ASC',
    orderField: 'field',
    ...data,
  };
};
