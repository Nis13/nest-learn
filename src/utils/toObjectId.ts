import { ObjectId } from 'mongodb';

export function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}
