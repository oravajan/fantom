// Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// 🔥 Sem vlož svou konfiguraci z Firebase Console!
const firebaseConfig = {
  apiKey: "AIzaSyBXYWqP5GKBwDlkeN3HkIwVxJLeESLQkDg",
  authDomain: "fantom-game.firebaseapp.com",
  projectId: "fantom-game",
  storageBucket: "fantom-game.firebasestorage.app",
  messagingSenderId: "992511279947",
  appId: "1:992511279947:web:5b182db0f7f291b51c5ece"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exportujeme Firebase pro použití v dalších souborech
export { db, auth, signInAnonymously };
