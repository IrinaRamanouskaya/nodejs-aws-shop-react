import * as cdk from 'aws-cdk-lib';
import { aws_cloudfront as cloudfront, aws_s3 as s3, aws_cloudfront_origins as origins, aws_iam as iam, aws_s3_deployment as s3deploy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DeploymentCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'RsSchoolAutomatedBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      autoDeleteObjects: true,
    });

    // Create CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'RsSchoolAutomatedDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html'
    });

    const bucketPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
      actions: ['s3:GetObject'],
      resources: [`${bucket.bucketArn}/*`],
      conditions: {
        StringEquals: {
          'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/*`
        }
      }
    });

    const originAccessIdentityPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      principals: [new iam.ArnPrincipal(`arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${distribution.distributionId}`)],
      actions: ['s3:GetObject'],
      resources: [`${bucket.bucketArn}/*`]
    });

    bucket.addToResourcePolicy(bucketPolicy);
    bucket.addToResourcePolicy(originAccessIdentityPolicy);

    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}