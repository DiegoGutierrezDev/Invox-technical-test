import { APIGatewayProxyHandler } from 'aws-lambda';
import { createUser } from '../../services/createUserService';

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || '{}');

  const user = await createUser(body.name, body.email, body.password);

  return {
    statusCode: 201,
    body: JSON.stringify(user),
  };
};
