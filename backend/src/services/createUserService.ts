import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddb } from '../libs/dynamodb';
import { v4 as uuidv4 } from 'uuid';

export async function createUser(name: string, email: string) {
  const userId = uuidv4();

  const command = new PutCommand({
    TableName: 'Users',
    Item: {
      id: userId,
      name,
      email,
      createdAt: new Date().toISOString(),
    },
  });

  await ddb.send(command);

  return { id: userId, name, email };
}
