import { DeleteResult, UpdateResult } from 'typeorm';

export function isAffected(result: DeleteResult | UpdateResult) {
  if (result.affected > 0) {
    return true;
  }
  return false;
}
