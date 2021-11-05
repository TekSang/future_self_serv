import awsAppSyncConfig from "./aws-exports";

const dev = {
  s3: {
    REGION: "eu-central-1",
    BUCKET: "",
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "",
  },
  appsync: awsAppSyncConfig,
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_f32ADgppN",
    APP_CLIENT_ID: "4r62v04vaic2i8l74tl9equr8h",
    IDENTITY_POOL_ID: "eu-central-1:253e16df-a4a3-415a-9630-c3ca4592f39a",
  },
};

const prod = {
  s3: {
    REGION: "YOUR_PROD_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME",
  },
  apiGateway: {
    REGION: "YOUR_PROD_API_GATEWAY_REGION",
    URL: "YOUR_PROD_API_GATEWAY_URL",
  },
  appsync: awsAppSyncConfig,
  cognito: {
    REGION: "YOUR_PROD_COGNITO_REGION",
    USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID",
  },
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

const configExport = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};

export default configExport;
