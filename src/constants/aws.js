
var AWS = require('aws-sdk');

AWS.config.update({
 accessKeyId: "AKIAX2Z3VWO7JCD47PM6",
 secretAccessKey: "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",
 region: 'ap-south-1'
});
var s3 = new AWS.S3();

export const UploadToAWS = (params) => {
 return s3.upload(params)
}