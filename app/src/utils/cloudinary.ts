import { CLOUD_NAME, UPLOAD_PRESET } from './constants';

export async function uploadToCloudinary(file: File, folderName: string): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folderName || 'default');

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();
  return data.secure_url;
}
