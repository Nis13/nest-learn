const returnMessage = (entity: string, id: string, message: string): string =>
  `${entity} of ID: ${id} ${message}`;

export default returnMessage;
