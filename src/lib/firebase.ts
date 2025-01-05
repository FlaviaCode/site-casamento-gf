import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAYTrPAU86X6K8i_LDoRRDvA55rWPD7acY",
  authDomain: "casamento-gf.firebaseapp.com",
  databaseURL: "https://casamento-gf-default-rtdb.firebaseio.com",
  projectId: "casamento-gf",
  storageBucket: "casamento-gf.firebasestorage.app",
  messagingSenderId: "401394776245",
  appId: "1:401394776245:web:d95fa22c3b1e51b6fd66fc",
  measurementId: "G-ZXQFEGCGRE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

let analytics = null;
isSupported().then(yes => yes && (analytics = getAnalytics(app)));

export { app, auth, database as db, storage, analytics };