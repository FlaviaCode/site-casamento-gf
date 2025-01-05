import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../../lib/firebase';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function tryUpload(
  storageRef: any, 
  file: File, 
  metadata: any, 
  retryCount = 0
): Promise<string> {
  try {
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        // Progress callback
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress:', progress);
        },
        // Error callback
        async (error) => {
          if (retryCount < MAX_RETRIES) {
            console.log(`Retrying upload (${retryCount + 1}/${MAX_RETRIES})...`);
            await delay(RETRY_DELAY);
            try {
              const result = await tryUpload(storageRef, file, metadata, retryCount + 1);
              resolve(result);
            } catch (retryError) {
              reject(retryError);
            }
          } else {
            console.error('Max retries exceeded:', error);
            reject(new Error('Failed to upload after multiple attempts'));
          }
        },
        // Success callback
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(new Error('Failed to get download URL'));
          }
        }
      );
    });
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying upload (${retryCount + 1}/${MAX_RETRIES})...`);
      await delay(RETRY_DELAY);
      return tryUpload(storageRef, file, metadata, retryCount + 1);
    }
    throw error;
  }
}

export async function uploadImage(file: File): Promise<string> {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to upload files');
  }

  try {
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Create a storage reference with a clean filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const filename = `${timestamp}.${extension}`;
    const storageRef = ref(storage, `gifts/${filename}`);

    // Set proper metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedBy: auth.currentUser.uid,
        originalName: file.name
      }
    };

    // Attempt upload with retries
    return await tryUpload(storageRef, file, metadata);
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
}