import AWS from 'aws-sdk';

const baseURL: string = process.env.REACT_APP_S3_BASE_URL as string;
const S3_BUCKET: string = process.env.REACT_APP_S3_BUCKET_NAME as string;
const REGION: string = process.env.REACT_APP_S3_REGION as string;
const ACCESS_KEY: string = process.env.REACT_APP_S3_ACCESS_KEY_ID as string;
const S3_SECRET_ACCESS_KEY: string = process.env.REACT_APP_S3_SECRET_ACCESS_KEY as string;

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
