Album Reviews Backend

This project uses the [Serverless Framework](https://serverless.com) to build a serverless GraphQL api for CRUD actions for album reviews. This project is configured to use AWS for its provider.

Example frontend repo can be found [here](https://github.com/telton/serverless-album-reviews-frontend).

Auth service is based on the [example Auth0 demo](https://github.com/serverless/examples/tree/master/aws-node-auth0-custom-authorizers-api)

To deploy Auth service:

```bash
$ cd auth-service

$ npm i

$ sls deploy --stage <STAGE>
```

To deploy Album Review service:

```bash
$ cd album-review-service

$ npm i

$ sls deploy --stage <STAGE>
```
