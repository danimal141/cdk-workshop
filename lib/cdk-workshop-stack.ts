import cdk = require('@aws-cdk/core')
import lambda = require('@aws-cdk/aws-lambda')
import apigateway = require('@aws-cdk/aws-apigateway')

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Define an AWS Lambda resource
    const helloFunc = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_8_10, // execution environment
      code: lambda.Code.asset('lambda'), // code loaded from the 'lambda' directory
      handler: 'hello.handler' // file is 'hello', function is 'handler'
    })

    // Define an API Gateway REST API resource backed by the above function
    new apigateway.LambdaRestApi(this, 'Endpoint', { handler: helloFunc })
  }
}
