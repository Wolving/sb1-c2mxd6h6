import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { TWILIO_CONFIG } from '../config/twilio';

export const signUp = async (email: string, password: string, userData: any) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    ...userData,
    createdAt: new Date(),
    verified: { email: false, phone: false }
  });
  return userCredential.user;
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  return signOut(auth);
};

export const sendVerificationSMS = async (phoneNumber: string) => {
  const response = await fetch('/api/send-verification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phoneNumber,
      ...TWILIO_CONFIG
    })
  });
  return response.json();
};