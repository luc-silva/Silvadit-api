export const updateQueryHelper = <T extends object>(
  bindColumns: { [key: string]: string },
  data: T,
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
