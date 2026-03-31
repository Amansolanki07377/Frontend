import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (login(email, password)) {
        navigate(email === 'admin@antigravity.com' ? '/admin' : '/');
      } else {
        setError('Invalid credentials for login attempt.');
      }
    } else {
      if (signup(name, email, password)) {
        navigate('/');
      } else {
        setError('Signup failed.');
      }
    }
  };

  return (
    <div className="auth-page flex-center container">
      <motion.div 
        className="auth-container glass"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header text-center">
          <h2 className="text-gradient mb-2">{isLogin ? 'Welcome Back' : 'Join AntiGravity'}</h2>
          <p className="text-secondary">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Sign up to unlock exclusive drops and rewards'}
          </p>
        </div>

        {error && (
          <div className="auth-error glass">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                key="name"
                className="input-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="input-group">
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="auth-options">
              <label className="remember-me flex-center" style={{ gap: '0.5rem' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="btn-primary auth-submit-btn full-width mt-4">
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
          </button>
        </form>

        <div className="auth-toggle text-center mt-4">
          <p className="text-secondary">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              className="toggle-btn"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="admin-hint text-center mt-4 text-xs text-secondary opacity-50">
            For admin access use: admin@antigravity.com / admin
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Auth;
