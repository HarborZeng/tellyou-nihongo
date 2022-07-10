const tencentcloud = require('tencentcloud-sdk-nodejs');

const TmtClient = tencentcloud.tmt.v20180321.Client;

const SECRET_ID = 'AKID5CFD5xobJwWwsfBUZ2NYWFGCvOdzBAuq'
const SECRET_KEY = 'oQQFrFPOOI3f3HNH1b0GMFwVuAJIAtWw'

exports.handler = async (event, context) => {
  const clientConfig = {
    credential: {
      secretId: SECRET_ID,
      secretKey: SECRET_KEY,
    },
    region: 'ap-chongqing',
    profile: {
      httpProfile: {
        endpoint: 'tmt.tencentcloudapi.com',
      },
    },
  };

// 实例化要请求产品的client对象,clientProfile是可选的
  const client = new TmtClient(clientConfig);
  const params = {
    'SourceText': event.body,
    'Source': 'ja',
    'Target': 'zh',
    'ProjectId': 0
  };
  return client.TextTranslate(params)
    .then((data) => ({
        statusCode: 200,
        body: data.TargetText,
      }), (err) => {
        console.error('error', err);
        return {
          statusCode: 400,
          body: err,
        }
      }
    ).catch((error) => ({statusCode: 422, body: String(error)}));
};
