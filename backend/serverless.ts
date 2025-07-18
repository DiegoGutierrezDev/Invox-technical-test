import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "backend",
  frameworkVersion: "4",
  plugins: [],
  provider: {
    name: "aws",
    runtime: "nodejs22.x",
    region: "us-east-1",
    environment: {
      USERS_TABLE: "Users",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:PutItem",
              "dynamodb:GetItem",
              "dynamodb:UpdateItem",
            ],
            Resource: "arn:aws:dynamodb:us-east-1:*:table/Users",
          },
          {
            Effect: "Allow",
            Action: [
              "cognito-idp:AdminCreateUser",
              "cognito-idp:AdminSetUserPassword",
              "cognito-idp:AdminConfirmSignUp",
              "cognito-idp:AdminGetUser",
            ],
            Resource:
              "arn:aws:cognito-idp:us-east-1:093365826297:userpool/us-east-1_ZBe5MgStb",
          },
        ],
      },
    },
  },
  functions: {
    createUser: {
      handler: "src/handlers/users/createUser.createUserHandler",
      events: [
        {
          http: {
            path: "users",
            method: "post",
            cors: true,
          },
        },
      ],
    },
    loginUser: {
      handler: "src/handlers/users/loginUser.loginUserHandler",
      events: [
        {
          http: {
            path: "login",
            method: "post",
            cors: true,
          },
        },
      ],
    },
  },
  package: { individually: true },
  custom: {},
};

module.exports = serverlessConfiguration;
