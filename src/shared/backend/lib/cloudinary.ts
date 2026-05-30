/**
 * @file: cloudinary.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: cloudinary 이미지 업로드
 */

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface IUploadCloudinary {
  files: File[];
  folderName?: string;
}

/** cloudinary 파일 업로드 */
export async function uploadCloudinary({
  files,
  folderName = 'mafilog-app',
}: IUploadCloudinary): Promise<string[]> {
  if (!files.length) return [];

  const uploadPromises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: folderName,
            transformation: [{ quality: 'auto', fetch_format: 'auto' }],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve((result as any).secure_url);
          },
        )
        .end(buffer);
    });
  });

  return Promise.all(uploadPromises);
}

/** cloudinary 파일 삭제 */
export const deleteCloudinary = async (imageUrl: string) => {
  try {     
    const urlParts = imageUrl.split('/');
    const filenameWithExtension = urlParts[urlParts.length - 1];
    const publicId = filenameWithExtension.split('.')[0];

    await cloudinary.uploader.destroy(`mafilog-app/${publicId}`);
    
    console.log(`Cloudinary 이미지 삭제 완료: ${publicId}`);
  } catch (error) {
    console.error('Cloudinary 이미지 삭제 실패:', error);
  }
};