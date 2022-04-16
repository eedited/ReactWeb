import AWS from 'aws-sdk';

let baseURL: string;
let S3_BUCKET: string;
let REGION: string;
let ACCESS_KEY: string;
let S3_SECRET_ACCESS_KEY: string;

if (process.env.NODE_ENV === 'production') {
    baseURL = process.env.REACT_APP_PROD_S3_BASE_URL as string;
    S3_BUCKET = process.env.REACT_APP_PROD_S3_BUCKET_NAME as string;
    REGION = process.env.REACT_APP_PROD_S3_REGION as string;
    ACCESS_KEY = process.env.REACT_APP_PROD_S3_ACCESS_KEY_ID as string;
    S3_SECRET_ACCESS_KEY = process.env.REACT_APP_PROD_S3_SECRET_ACCESS_KEY as string;
}

else {
    baseURL = process.env.REACT_APP_DEV_S3_BASE_URL as string;
    S3_BUCKET = process.env.REACT_APP_DEV_S3_BUCKET_NAME as string;
    REGION = process.env.REACT_APP_DEV_S3_REGION as string;
    ACCESS_KEY = process.env.REACT_APP_DEV_S3_ACCESS_KEY_ID as string;
    S3_SECRET_ACCESS_KEY = process.env.REACT_APP_DEV_S3_SECRET_ACCESS_KEY as string;
}

export default class FileUploadToS3 {
    fileType: 'img'

    aimType: 'thumbnail' | 'profile'

    bucket: AWS.S3

    constructor(fileType: 'img', aimType: 'thumbnail'|'profile') {
        this.fileType = fileType;
        this.aimType = aimType;
        AWS.config.update({
            region: REGION,
            accessKeyId: ACCESS_KEY,
            secretAccessKey: S3_SECRET_ACCESS_KEY,
        });
        this.bucket = new AWS.S3({
            region: REGION,
        });
    }

    getBaseProfileImgUrl(): string {
        const imgIdx: number = Math.floor(47 * Math.random());
        return `${baseURL}/${this.fileType}/_default/profile${imgIdx}.jpeg`;
    }

    upload(uploadUser: string, fileStream: File): string {
        const upload: AWS.Request<AWS.S3.PutObjectOutput, AWS.AWSError> = this.bucket.putObject({
            Body: fileStream,
            Bucket: S3_BUCKET,
            Key: `${this.fileType}/${uploadUser}/${this.aimType}`,
        }, (err: AWS.AWSError, data: AWS.S3.PutObjectOutput) => {
            if (err) {
                console.log(err);
            }
            if (data) {
                console.log(data);
            }
        });
        return `${baseURL}/${this.fileType}/${uploadUser}/${this.aimType}`;
    }
}
