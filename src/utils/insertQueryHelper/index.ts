export const insertQueryHelper = <T extends object>(
  bindColumns: { [key: string]: string },
  data: T,
) => {
  const binds = Object.keys(bindColumns);
  const dataFields = Object.keys(data);

  const existingData = binds.reduce(
    (acc, current) => {
      if (dataFields.includes(current) && data[current]) {
        acc.values.push(`:${current}`);
        acc.columns.push(bindColumns[current]);
        acc.binds[current] = data[current];
      }

      return acc;
    },
    {
      values: [],
      columns: [],
      binds: {},
    } as { values: string[]; columns: string[]; binds: { [key: string]: any } },
  );

  return existingData;
};
