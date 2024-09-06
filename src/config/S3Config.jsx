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
export const checkFile = (typeFile, file) => {
    if (file !== undefined && file instanceof File) {
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
export const getObjectUrlImage = async (keyName) => {
    const response = await s3Client.send(new GetObjectCommand({
        Bucket: connectAWSParams.bucketName,
        Key: keyName,
    }));
    const str = await response.Body?.transformToByteArray();
    const blob = new Blob([str], { type: response.ContentType });

    var blobUrl = URL.createObjectURL(blob)
    return blobUrl;
}
export const getObjectAsFile = async (keyName) => {
        const response = await s3Client.send(new GetObjectCommand({
            Bucket: connectAWSParams.bucketName,
            Key: keyName,
        }));
        const typeFile =  typeFileFromKeyName(keyName); 
        const str = await response.Body?.transformToByteArray();
        const blob = new Blob([str], { type: typeFile|| response.ContentType});
        const file = new File([blob], keyName, { type: typeFile || response.ContentType });
        return file;
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
const typeFileFromKeyName = (keyName) => {
    const typeKeyname = keyName.substring(keyName.lastIndexOf(".") + 1,keyName.length);
    const type = {
        "png": "image/png",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg"  // Thêm 'jpg' nếu cần
    };
    return type[typeKeyname];
}
