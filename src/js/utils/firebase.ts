import * as firebase from 'firebase';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
};

firebase.initializeApp(config);

export const ref: IFirebaseRef = firebase.database().ref();
export const firebaseAuth: IFirebaseAuth = firebase.auth();

export const headToHeadsRef = ref.child('headToHeads');
export const playersRef = ref.child('players');
export const gamesRef = ref.child('games');

export function auth(email, pw) {
  return firebaseAuth
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function login(email, pw) {
  return firebaseAuth.signInWithEmailAndPassword(email, pw);
}

export function logout() {
  return firebaseAuth.signOut();
}

export function resetPassword(email) {
  return firebaseAuth.sendPasswordResetEmail(email);
}

export function off() {
  return ref.off();
}

export function saveUser(user) {
  return ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
    })
    .then(() => user);
}
