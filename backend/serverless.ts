import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '4',
  plugins: [],
  provider: {
    name: 'aws',
    runtime: 'nodejs22.x',
    region: 'us-east-1',
     environment: {
      USERS_TABLE: 'Users',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['dynamodb:PutItem'],
            Resource: 'arn:aws:dynamodb:us-east-1:*:table/Users',
          },
        ],
      },
    },
  },
  functions: {
    hello: {
      handler: 'src/functions/hello.hello',
      events: [
        {
          http: {
            path: 'hello',
            method: 'get',
          },
        },
      ],
    },
    createUser: {
        handler: 'src/handlers/users/createUser.createUserHandler',
            events: [
            { 
                http: {
                path: 'users',
                method: 'post',
                }
            }
        ],
    }

  },
  package: { individually: true },
  custom: {
  },
    resources: {
    Resources: {
      UsersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Users",
          AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" }
          ],
          KeySchema: [
            { AttributeName: "id", KeyType: "HASH" }
          ],
          BillingMode: "PAY_PER_REQUEST"
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
