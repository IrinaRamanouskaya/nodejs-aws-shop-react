import * as cdk from 'aws-cdk-lib';
import { aws_cloudfront as cloudfront, aws_s3 as s3, aws_iam as iam, aws_s3_deployment as s3deploy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DeploymentCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'shop-OAI')

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'RsSchoolAutomatedBucket', {
      bucketName: 'shop-cdk-deployment',
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],

      effect: iam.Effect.ALLOW,
      conditions: {
        StringEquals: {
          'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/*`
        }
      }
    }));

    // Create CloudFront distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'RsSchoolAutomatedDistribution', {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: cloudFrontOAI,
        },
        behaviors: [{
          isDefaultBehavior: true,
        }]
      }],
    });

    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}