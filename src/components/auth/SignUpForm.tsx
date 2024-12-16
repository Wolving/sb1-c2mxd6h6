import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../validation/userSchema';
import { Input } from '../common/Input';
import { ImageUpload } from '../common/ImageUpload';
import { auth, db, storage } from '../../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const SignUpForm: React.FC = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Upload photos
      const photoUrls = await Promise.all(
        photos.map(async (photo) => {
          const storageRef = ref(storage, `users/${user.uid}/photos/${photo.name}`);
          await uploadBytes(storageRef, photo);
          return getDownloadURL(storageRef);
        })
      );

      // Create user profile
      await setDoc(doc(db, 'users', user.uid), {
        ...data,
        photos: photoUrls,
        verified: {
          email: false,
          phone: false
        },
        createdAt: new Date()
      });

      // Send email verification
      await sendEmailVerification(user);

      // Send SMS verification (implement with your preferred SMS service)
      // await sendSMSVerification(data.phoneNumber);

      alert('Please check your email and phone for verification links');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Phone Number"
        {...register('phoneNumber')}
        error={errors.phoneNumber?.message}
      />
      <Input
        label="Address"
        {...register('address')}
        error={errors.address?.message}
      />
      <Input
        label="Rate (50-5000)"
        type="number"
        min={50}
        max={5000}
        {...register('rate')}
        error={errors.rate?.message}
      />
      
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select {...register('status')} className="mt-1 block w-full rounded-md border-gray-300">
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>
      </div>

      <ImageUpload
        onImagesSelected={setPhotos}
        maxImages={10}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};