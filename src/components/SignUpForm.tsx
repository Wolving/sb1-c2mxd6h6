import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../validation/userSchema';
import { Input } from './Input';
import type { UserData } from '../types/user';

export const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserData) => {
    try {
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', data);
      alert('Sign up successful!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <Input
        label="Name"
        type="text"
        {...register('name')}
        error={errors.name?.message}
        placeholder="John Doe"
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="john@example.com"
      />

      <Input
        label="Phone Number"
        type="tel"
        {...register('phoneNumber')}
        error={errors.phoneNumber?.message}
        placeholder="+1234567890"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};