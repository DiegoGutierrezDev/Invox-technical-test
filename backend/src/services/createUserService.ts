import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddb } from '../libs/dynamodb';
import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { v4 as uuidv4 } from 'uuid';

const cognito = new CognitoIdentityProviderClient({ region: 'us-east-1' });
const userPoolId = 'us-east-1_ZBe5MgStb';

export async function createUser(name: string, email: string, password: string) {
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

  await cognito.send(new AdminCreateUserCommand({
    UserPoolId: userPoolId,
    Username: email,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: name },
      { Name: 'email_verified', Value: 'true' }
    ],
    MessageAction: 'SUPPRESS',
  }));

  await cognito.send(new AdminSetUserPasswordCommand({
    UserPoolId: userPoolId,
    Username: email,
    Password: password,
    Permanent: true,
  }));

  return { id: userId, name, email };
}
