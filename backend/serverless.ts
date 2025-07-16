import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '4',
  plugins: [],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-west-1',
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
  },
  package: { individually: true },
  custom: {
  },
};

module.exports = serverlessConfiguration;
