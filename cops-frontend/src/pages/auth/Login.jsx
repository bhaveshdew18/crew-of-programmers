import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, ArrowRight, GraduationCap, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// 1. Zod Schema now requires a role
const loginSchema = z.object({
  role: z.enum(['student', 'mentor'], { required_error: "Please select a role" }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const Login = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: 'student' } // Default to student
  });

  const selectedRole = watch('role'); // Watch this value to highlight the selected button

  // 2. Dynamic Routing based on Role
  const onSubmit = (data) => {
    console.log("Login Payload for Spring Boot:", data);
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
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">Welcome back</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-200">
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Role Selection UI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${selectedRole === 'student' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  <input type="radio" value="student" {...register("role")} className="sr-only" />
                  <GraduationCap className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Student</span>
                </label>
                
                <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${selectedRole === 'mentor' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  <input type="radio" value="mentor" {...register("role")} className="sr-only" />
                  <Briefcase className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Teacher</span>
                </label>
              </div>
              {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email")}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="name@institute.edu"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Sign in <ArrowRight className="ml-2 w-4 h-4 mt-0.5" />
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Register here</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;