import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User, ArrowRight, GraduationCap, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// 1. Zod Schema with Password Match Validation
const registerSchema = z.object({
  role: z.enum(['student', 'mentor'], { required_error: "Please select a role" }),
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Puts the error under the confirm password field
});

const Register = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' }
  });

  const selectedRole = watch('role');

  const onSubmit = (data) => {
    // We strip out the confirmPassword before sending to the backend
    const { confirmPassword, ...payload } = data;
    console.log("Registration Payload for Spring Boot:", payload);
    
    // Route them to the correct dashboard upon successful registration
    if (data.role === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/teacher/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-600 tracking-tight">COPs</h2>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-200">
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am registering as a...</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center transition-colors ${selectedRole === 'student' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  <input type="radio" value="student" {...register("role")} className="sr-only" />
                  <GraduationCap className="w-5 h-5 mb-1" />
                  <span className="text-sm font-medium">Student</span>
                </label>
                
                <label className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center transition-colors ${selectedRole === 'mentor' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  <input type="radio" value="mentor" {...register("role")} className="sr-only" />
                  <Briefcase className="w-5 h-5 mb-1" />
                  <span className="text-sm font-medium">Teacher</span>
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input {...register("fullName")} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="John Doe" />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input {...register("email")} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="name@institute.edu" />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Passwords Grid */}
            <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="password" {...register("password")} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="••••••••" />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="password" {...register("confirmPassword")} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="••••••••" />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Create Account <ArrowRight className="ml-2 w-4 h-4 mt-0.5" />
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in here</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;