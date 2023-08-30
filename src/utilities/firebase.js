import { initializeApp } from 'firebase/app';
import { getDatabase , ref, set } from 'firebase/database';
import { useObject } from 'react-firebase-hooks/database';
// añado para hacer login/logout
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBxuoNm3vg8d-1ujZzbqX2NsXUa8bTc5lg",
    authDomain: "courseslist-7412f.firebaseapp.com",
    databaseURL: "https://courseslist-7412f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "courseslist-7412f",
    storageBucket: "courseslist-7412f.appspot.com",
    messagingSenderId: "88018273143",
    appId: "1:88018273143:web:938de66869ac9036751772"
  };
  

  const firebase = initializeApp(firebaseConfig);
  const database = getDatabase(firebase);
  
  export const DatabaseValue = (value, transform) => {
    const [snapshot, loading, error] = useObject(ref(database, value));
    let data;
    if (snapshot) {
      const val = snapshot.val();
      data = (!loading && !error && transform) ? transform(val) : val;
    }
    
    return [ data, loading, error ];
  }
  
  // esta función guarda un valor en la base de datos de Firebase en la ubicación que esté referenciada 
  // por la ruta (path).
  
  export const setData = (path, value) => {
    console.log (path);
    console.log (value);
    set(ref(database, path), value)
  };
  
  // añado para hacer login
  export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };
  
  // añado para hacer logout
  const firebaseSignOut = () => signOut(getAuth(firebase));
  export { firebaseSignOut as signOut };
  
  export const useUserState = () => useAuthState(getAuth(firebase));