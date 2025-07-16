import { APIGatewayProxyHandler } from 'aws-lambda';
import { createUser } from '../../services/createUserService';

export const createUserHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    if (!body.name || !body.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing name or email' }),
      };
    }
    const user = await createUser(body.name, body.email);

    return {
      statusCode: 201,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
