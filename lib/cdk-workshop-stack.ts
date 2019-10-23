import cdk = require('@aws-cdk/core')
import lambda = require('@aws-cdk/aws-lambda')
import apigateway = require('@aws-cdk/aws-apigateway')
import { HitCounter } from './hit-counter'

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const helloFunc = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_8_10, // execution environment
      code: lambda.Code.asset('lambda'), // code loaded from the 'lambda' directory
      handler: 'hello.handler' // file is 'hello', function is 'handler'
    })
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: helloFunc
    })

    new apigateway.LambdaRestApi(this, 'Endpoint', { handler: helloWithCounter.handler })
  }
}
