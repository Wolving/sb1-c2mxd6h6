import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { TWILIO_CONFIG } from '../config/twilio';

interface MessageData {
  userId: string;
  message: string;
  type: 'email' | 'sms';
  recipientEmail: string;
  recipientPhone: string;
}

export const sendDirectMessage = async (data: MessageData) => {
  // Store message in Firestore
  await addDoc(collection(db, 'messages'), {
    ...data,
    timestamp: new Date(),
    status: 'pending'
  });

  // Send the actual message
  const endpoint = data.type === 'email' ? '/api/send-email' : '/api/send-sms';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      ...TWILIO_CONFIG
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to send ${data.type}`);
  }

  return response.json();
};