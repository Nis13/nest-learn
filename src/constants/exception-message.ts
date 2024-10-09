import returnMessage from 'src/utils/returnExceptionMessage';

// export   enum EXCEPTION_MESSAGE {
//   NOT_DELETED :"can't be deleted message",
//   DELETION_SUCCESSFULL :'sucessfully deleted message',
//   NOT_UPDATED :"can't be updated",
// }
export const EXCEPTION_MESSAGE = {
  ENTITY_NOT_FOUND: (entity: string, id: string): string =>
    returnMessage(entity, id, 'not found'),

  ENTITY_DELETED: (entity: string, id: string): string =>
    returnMessage(entity, id, 'successfully deleted'),

  NO_ENTITIES_FOUND: (entity: string): string =>
    `There are no ${entity}s available`,

  NOT_VALID: (entity: string): string => `${entity} is not Valid`,

  LOGIN_MESSAGE: (): string => `Successfully logged in!`,

  DELETION_FAILED: (entity: string, id: string): string =>
    `${entity} of Id:${id} cannot be deleted`,

  UPDATE_FAILED: (entity: string, id: string): string =>
    `${entity} of Id:${id} cannot be updated`,
};
