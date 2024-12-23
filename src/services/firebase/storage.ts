import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../../lib/firebase';

export async function uploadImage(file: File): Promise<string> {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to upload files');
  }

  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const storageRef = ref(storage, `gifts/${filename}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        uploadedBy: auth.currentUser.uid,
        originalName: file.name
      }
    });

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
}