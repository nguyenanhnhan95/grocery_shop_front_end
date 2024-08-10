import {
    S3Client, PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { FILE_IMAGE, connectAWSParams } from "../utils/commonConstants";
const s3Client = new S3Client({
    region: connectAWSParams.region,
    credentials: {
        accessKeyId: connectAWSParams.accessKeyId,
        secretAccessKey: connectAWSParams.secretAccessKey,
    },
});
export const checkFile = ( typeFile, file) => {
    if(file !== undefined && file instanceof File){
        console.log(file)
        switch (typeFile) {
            case FILE_IMAGE:
                console.log(file)
                return file;
            default:
                return;
        }
    }
    
};
export const getObject = async (keyName) => {
        const response = await s3Client.send(new GetObjectCommand({
            Bucket: connectAWSParams.bucketName,
            Key: keyName,
        }));
        console.log(response)
        const str = await response.Body?.transformToByteArray();
        const blob = new Blob([str], { type: response.ContentType });
    
        var blobUrl = URL.createObjectURL(blob)
        console.log(response.ContentType)
        return blobUrl;
}
export const putObject = async (keyName, body) => {
    try {
        const results = await s3Client.send(new PutObjectCommand({
            Bucket: connectAWSParams.bucketName,
            Key: keyName,
            Body: body, // Dữ liệu tải lên
        }));
        return results;
    } catch (error) {
        console.error(error);// Ném lỗi ra ngoài nếu cần xử lý thêm
    }
};

