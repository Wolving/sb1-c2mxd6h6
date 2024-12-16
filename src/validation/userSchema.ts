import { z } from 'zod';

export const userSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  address: z.string()
    .min(5, 'Address must be at least 5 characters'),
  rate: z.number()
    .min(50, 'Minimum rate is $50')
    .max(5000, 'Maximum rate is $5000'),
  status: z.enum(['IN', 'OUT']),
  photos: z.array(z.string())
    .min(1, 'At least one photo is required')
    .max(10, 'Maximum 10 photos allowed')
});