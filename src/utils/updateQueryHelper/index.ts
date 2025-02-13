export const updateQueryHelper = (
  bindColumns: { [key: string]: string },
  data: { [key: string]: string },
) => {
  const binds = Object.keys(bindColumns);
  const dataFields = Object.keys(data);

  const existingData = binds.reduce(
    (acc, current) => {
      if (dataFields.includes(current)) {
        acc.queries.push(`${bindColumns[current]} = :${current}`); 
      }

      return acc;
    },
    {
      queries: [],
    } as { queries: string[] },
  );

  return existingData;
};
