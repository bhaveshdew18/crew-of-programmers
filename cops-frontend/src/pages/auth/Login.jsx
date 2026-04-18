import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertCircle, ArrowRight, Briefcase, GraduationCap, Lock, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { useAuth } from '../../context/useAuth';
import { getDashboardPath, toFormRole } from '../../utils/roles';

const loginSchema = z.object({
  role: z.enum(['student', 'mentor'], { required_error: 'Please select a role' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const successMessage = location.state?.registrationSuccess
    ? 'Account created successfully. Sign in to continue.'
    : '';

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: location.state?.role ? toFormRole(location.state.role) : 'student',
      email: location.state?.email || '',
      password: '',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    setApiError('');
    setIsLoading(true);

    try {
      const response = await authService.login(data.email, data.password, data.role);
      login(response.data);
      navigate(getDashboardPath(response.data?.data?.role || data.role), { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-blue-600 tracking-tight">COPs</h1>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">Welcome back</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-200">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}

          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-800">{apiError}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${selectedRole === 'student' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  <input type="radio" value="student" {...register('role')} className="sr-only" disabled={isLoading} />
                  <GraduationCap className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Student</span>
                </label>

                <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${selectedRole === 'mentor' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  <input type="radio" value="mentor" {...register('role')} className="sr-only" disabled={isLoading} />
                  <Briefcase className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Teacher</span>
                </label>
              </div>
              {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  disabled={isLoading}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100`}
                  placeholder="name@institute.edu"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register('password')}
                  disabled={isLoading}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100`}
                  placeholder="********"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4 mt-0.5" />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Don&apos;t have an account? </span>
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
