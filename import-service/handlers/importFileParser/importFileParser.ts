import { S3Handler } from "aws-lambda";
import {S3} from 'aws-sdk';
import * as csv from 'csv-parser';

export const importFileParser: S3Handler = async event => {
    const s3 = new S3({region: 'eu-west-1', signatureVersion: 'v4'});

    for (const record of event.Records) {
        try {
            s3.getObject({Bucket: record.s3.bucket.name, Key: record.s3.object.key}).createReadStream()
                .on('error', error => console.log(`Service error: ${error}`))
                    .pipe(csv())
                    .on('error', error => console.log(error))
                    .on('data', chunk => console.log(JSON.stringify(chunk)))
                    .on('close', () => console.log('COPY'));
        } catch(exception) {
            console.log(exception);
        }
    }
};