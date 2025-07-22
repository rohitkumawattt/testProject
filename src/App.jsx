import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, FlaskConical, History, BarChart2, ShieldCheck, Mail, Lock, User, UserPlus, LogIn, LayoutDashboard, CalendarPlus, ListChecks, FileText, Home, Info, LogOut } from 'lucide-react';
import "./App.css"
// You would typically include Bootstrap CSS and JS in your public/index.html like this:
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

// --- 1. Auth Context ---
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Stores basic user info like email, name
  const navigate = useNavigate();

  // On initial load, check if a token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user_info');
    if (token && storedUser) {
      try {
        // In a real app, you'd verify the token with your backend
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
        logout(); // Clear invalid data
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call to your backend /api/login
      // Replace 'http://localhost:5000/api/login' with your actual backend URL
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simulate successful login
        const token = data.token || 'simulated_jwt_token_123'; // Backend would send a real token
        const userInfo = data.user || { name: 'Demo User', email: email }; // Backend would send real user info

        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
        setIsLoggedIn(true);
        setUser(userInfo);
        navigate('/dashboard'); // Redirect to dashboard on success
        return { success: true };
      } else {
        // Simulate login failure
        const errorMessage = data.message || 'Login failed. Please check your credentials.';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Login API call error:', error);
      return { success: false, error: 'Network error or server unavailable.' };
    }
  };

  const register = async (fullName, email, password, isCaregiver) => {
    try {
      // Simulate API call to your backend /api/signup
      // Replace 'http://localhost:5000/api/signup' with your actual backend URL
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password, is_caregiver: isCaregiver }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simulate successful registration
        const token = data.token || 'simulated_jwt_token_new_user'; // Backend would send a real token
        const userInfo = data.user || { name: fullName, email: email };

        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
        setIsLoggedIn(true);
        setUser(userInfo);
        navigate('/dashboard'); // Redirect to dashboard on success
        return { success: true };
      } else {
        // Simulate registration failure
        const errorMessage = data.message || 'Registration failed. Please try again.';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Registration API call error:', error);
      return { success: false, error: 'Network error or server unavailable.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Common Card Wrapper for Auth Forms ---
const AuthCard = ({ title, children }) => (
  <div className="card shadow-lg border-0 rounded-3" style={{ maxWidth: '450px', width: '100%' }}>
    <div className="card-body p-4 p-md-5">
      <h2 className="card-title text-center text-primary mb-4 fw-bold">{title}</h2>
      {children}
    </div>
  </div>
);

// --- Login Page UI Component ---
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3">
      <AuthCard title="Welcome Back!">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {error && <div className="alert alert-danger text-center small" role="alert">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label small text-muted">Email Address</label>
            <div className="input-group has-validation">
              <span className="input-group-text"><Mail size={20} /></span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control rounded-end"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">Please enter a valid email.</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label small text-muted">Password</label>
            <div className="input-group has-validation">
              <span className="input-group-text"><Lock size={20} /></span>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control rounded-end"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">Please enter your password.</div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember-me"
                name="remember-me"
              />
              <label className="form-check-label small text-muted" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <div className="small">
              <Link to="/forgot-password" className="text-decoration-none text-primary">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill shadow-sm d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              {loading ? 'Logging In...' : <><LogIn size={20} className="me-2" /> Log In</>}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center small text-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="text-decoration-none text-primary">
            Sign Up
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

// --- Registration Page UI Component ---
const RegistrationPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCaregiver, setIsCaregiver] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!fullName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setError('Password must be at least 8 characters, include an uppercase letter, a number, and a symbol.');
      setLoading(false);
      return;
    }

    const result = await register(fullName, email, password, isCaregiver);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3">
      <AuthCard title="Create Your Account">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {error && <div className="alert alert-danger text-center small" role="alert">{error}</div>}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label small text-muted">Full Name</label>
            <div className="input-group has-validation">
              <span className="input-group-text"><User size={20} /></span>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control rounded-end"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="invalid-feedback">Please enter your full name.</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label small text-muted">Email Address</label>
            <div className="input-group has-validation">
              <span className="input-group-text"><Mail size={20} /></span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control rounded-end"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">Please enter a valid email.</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label small text-muted">Password</label>
            <div className="input-group has-validation">
              <span className="input-group-text"><Lock size={20} /></span>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control rounded-end"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">Please enter a password.</div>
            </div>
            <div className="form-text small text-muted">Min. 8 characters, with uppercase, number, and symbol.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label small text-muted">Confirm Password</label>
            <div className="input-group has-validation">
              <span className="input-group-text"><Lock size={20} /></span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control rounded-end"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="invalid-feedback">Please confirm your password.</div>
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="isCaregiver"
              name="isCaregiver"
              checked={isCaregiver}
              onChange={(e) => setIsCaregiver(e.target.checked)}
            />
            <label className="form-check-label small text-muted" htmlFor="isCaregiver">
              I am a caregiver
            </label>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="terms"
              name="terms"
              required
            />
            <label className="form-check-label small text-muted" htmlFor="terms">
              I agree to the{' '}
              <Link to="/terms" className="text-decoration-none text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-decoration-none text-primary">
                Privacy Policy
              </Link>
            </label>
            <div className="invalid-feedback">You must agree to the terms.</div>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill shadow-sm d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : <><UserPlus size={20} className="me-2" /> Sign Up</>}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center small text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none text-primary">
            Log In
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

// --- Home Page UI Component ---
const HomePage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column min-vh-100 bg-blue">
      {/* Header/Navigation Bar */}
      <header className="navbar navbar-expand-md navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid container-md">
          {/* Logo/Site Title */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src="https://placehold.co/40x40/6366F1/FFFFFF?text=AI" alt="RareJournal AI Logo" className="rounded-circle me-2" />
            <span className="h4 mb-0 text-primary fw-bold">RareJournal AI</span>
          </Link>

          {/* Mobile Toggler */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-md-center">
              <li className="nav-item">
                <Link to="/" className="nav-link d-flex align-items-center me-3">
                  <Home size={18} className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/features" className="nav-link d-flex align-items-center me-3">
                  <FlaskConical size={18} className="me-1" /> Features
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link d-flex align-items-center me-3">
                  <Info size={18} className="me-1" /> About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link d-flex align-items-center me-3">
                  <Mail size={18} className="me-1" /> Contact
                </Link>
              </li>

              {/* Conditional Auth Links */}
              {!isLoggedIn ? (
                <>
                  <li className="nav-item mt-2 mt-md-0 me-md-2">
                    <Link to="/signup" className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center">
                      <UserPlus size={18} className="me-1" /> Sign Up
                    </Link>
                  </li>
                  <li className="nav-item mt-2 mt-md-0">
                    <Link to="/login" className="btn btn-outline-primary rounded-pill d-flex align-items-center justify-content-center">
                      <LogIn size={18} className="me-1" /> Log In
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link d-flex align-items-center me-3">
                      <LayoutDashboard size={18} className="me-1" /> Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/add-symptom" className="nav-link d-flex align-items-center me-3">
                      <CalendarPlus size={18} className="me-1" /> Log Symptom
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/symptom-history" className="nav-link d-flex align-items-center me-3">
                      <ListChecks size={18} className="me-1" /> History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/reports" className="nav-link d-flex align-items-center me-3">
                      <FileText size={18} className="me-1" /> Reports
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link d-flex align-items-center me-3">
                      <User size={18} className="me-1" /> Profile
                    </Link>
                  </li>
                  <li className="nav-item mt-2 mt-md-0">
                    <button
                      onClick={logout}
                      className="btn btn-danger rounded-pill d-flex align-items-center justify-content-center"
                    >
                      <LogOut size={18} className="me-1" /> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>

      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-purple text-white py-5 px-3 text-center rounded-bottom-4 shadow-lg">
          <div className="container-md mx-auto" style={{ maxWidth: '900px' }}>
            <h1 className="display-4 fw-bold lh-base mb-3 animate-fade-in-up">
              Empowering Your Journey with Rare Conditions with <span className="text-warning">AI-Powered Insights</span>
            </h1>
            <p className="lead mb-4 opacity-90 animate-fade-in-up delay-100">
              Track, Analyze, and Understand Your Symptoms Like Never Before.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link
                to="/signup"
                className="btn btn-light btn-lg rounded-pill shadow-sm d-flex align-items-center justify-content-center"
              >
                Get Started - Sign Up Free
                <ChevronRight size={20} className="ms-2" />
              </Link>
              <a
                href="#features-overview"
                className="btn btn-outline-light btn-lg rounded-pill border-2 d-flex align-items-center justify-content-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Overview Section */}
        <section id="features-overview" className="py-5 px-3 bg-white">
          <div className="container-md mx-auto text-center">
            <h2 className="display-5 fw-bold text-dark mb-5">Key Features Designed for You</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {/* Feature Card 1: Symptom Tracking */}
              <div className="col">
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="card-body p-4 text-center">
                    <div className="text-primary mb-3">
                      <CalendarPlus size={48} className="mx-auto" />
                    </div>
                    <h3 className="h5 card-title fw-semibold mb-2">Intuitive Symptom Logging</h3>
                    <p className="card-text text-muted">
                      Easily record your symptoms with detailed descriptions, severity levels, and associated factors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 2: AI Insights */}
              <div className="col">
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="card-body p-4 text-center">
                    <div className="text-purple mb-3">
                      <FlaskConical size={48} className="mx-auto" />
                    </div>
                    <h3 className="h5 card-title fw-semibold mb-2">Basic AI-Powered Insights</h3>
                    <p className="card-text text-muted">
                      Identify patterns and trends in your symptoms to better understand your condition.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 3: Historical Tracking */}
              <div className="col">
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="card-body p-4 text-center">
                    <div className="text-success mb-3">
                      <History size={48} className="mx-auto" />
                    </div>
                    <h3 className="h5 card-title fw-semibold mb-2">Comprehensive History</h3>
                    <p className="card-text text-muted">
                      View and manage all your past symptom entries in one organized place.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 4: Data Visualization */}
              <div className="col">
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="card-body p-4 text-center">
                    <div className="text-info mb-3">
                      <BarChart2 size={48} className="mx-auto" />
                    </div>
                    <h3 className="h5 card-title fw-semibold mb-2">Visual Reports</h3>
                    <p className="card-text text-muted">
                      Generate simple reports and charts to visualize symptom frequency and severity over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-5 px-3 bg-light">
          <div className="container-md mx-auto text-center" style={{ maxWidth: '700px' }}>
            <h2 className="display-5 fw-bold text-dark mb-5">How It Works</h2>
            <div className="d-flex flex-column gap-4">
              {/* Step 1 */}
              <div className="d-flex flex-column flex-md-row align-items-center text-md-start bg-white p-4 rounded-3 shadow-sm">
                <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-primary text-white rounded-circle me-md-4 mb-3 mb-md-0" style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  1
                </div>
                <div>
                  <h3 className="h4 fw-semibold text-dark mb-2">Log Your Symptoms</h3>
                  <p className="text-muted mb-0">
                    Quickly and easily record every detail about your symptoms, including date, time, severity, and any contributing factors. Our intuitive forms make it simple.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="d-flex flex-column flex-md-row align-items-center text-md-start bg-white p-4 rounded-3 shadow-sm">
                <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-purple text-white rounded-circle me-md-4 mb-3 mb-md-0" style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  2
                </div>
                <div>
                  <h3 className="h4 fw-semibold text-dark mb-2">Gain Basic AI Insights</h3>
                  <p className="text-muted mb-0">
                    Our system helps you identify patterns and trends within your logged data, offering a clearer picture of your health journey.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="d-flex flex-column flex-md-row align-items-center text-md-start bg-white p-4 rounded-3 shadow-sm">
                <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-success text-white rounded-circle me-md-4 mb-3 mb-md-0" style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  3
                </div>
                <div>
                  <h3 className="h4 fw-semibold text-dark mb-2">Share & Discuss</h3>
                  <p className="text-muted mb-0">
                    Generate comprehensive reports from your data to share with your healthcare providers, facilitating more informed discussions and better care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action before Footer */}
        <section className="bg-primary text-white py-5 px-3 text-center rounded-top-4 shadow-lg">
          <div className="container-md mx-auto" style={{ maxWidth: '700px' }}>
            <h2 className="display-5 fw-bold mb-3">Ready to Take Control of Your Health Journey?</h2>
            <p className="lead mb-4 opacity-90">
              Join RareJournal AI today and start tracking your symptoms with confidence.
            </p>
            <Link
              to="/signup"
              className="btn btn-light btn-lg rounded-pill shadow-sm d-flex align-items-center justify-content-center mx-auto"
              style={{ maxWidth: '300px' }}
            >
              Sign Up Now - It's Free!
              <ChevronRight size={20} className="ms-2" />
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-dark text-white py-4 px-3 text-center">
        <div className="container-md mx-auto">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="small mb-2 mb-md-0">
              &copy; {new Date().getFullYear()} RareJournal AI. All rights reserved.
            </div>
            <div className="d-flex gap-3">
              <Link to="/privacy" className="text-white-50 text-decoration-none small">Privacy Policy</Link>
              <Link to="/terms" className="text-white-50 text-decoration-none small">Terms of Service</Link>
              <Link to="/contact" className="text-white-50 text-decoration-none small">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Placeholder for Dashboard Page ---
const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // This is a very basic protected route. In a real app, you'd check token validity with backend.
    if (!user) {
      navigate('/login'); // Redirect if not logged in
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3">
      <AuthCard title={`Welcome, ${user.name || user.email}! 👋`}>
        <p className="text-center lead mb-3">This is your Dashboard.</p>
        <p className="text-center text-muted mb-4">
          You are logged in as: <span className="fw-semibold">{user.email}</span>
        </p>
        <div className="d-grid gap-3">
          <Link to="/" className="btn btn-primary btn-lg rounded-pill d-flex align-items-center justify-content-center">
            Go to Home Page
            <ChevronRight size={20} className="ms-2" />
          </Link>
          <button
            onClick={logout}
            className="btn btn-outline-danger btn-lg rounded-pill d-flex align-items-center justify-content-center"
          >
            <LogOut size={20} className="me-2" />
            Logout
          </button>
        </div>
      </AuthCard>
    </div>
  );
};


// --- Main App component that handles routing and provides AuthContext ---
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* Protected route example */}

          {/* Placeholder routes for future pages */}
          <Route path="/features" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Features Page"><p className="text-center text-muted">This will be the Features page content.</p><Link to="/" className="text-decoration-none text-primary mt-3">Go Home</Link></AuthCard></div>} />
          <Route path="/about" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="About Us Page"><p className="text-center text-muted">This will be the About Us page content.</p><Link to="/" className="text-decoration-none text-primary mt-3">Go Home</Link></AuthCard></div>} />
          <Route path="/contact" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Contact Page"><p className="text-center text-muted">This will be the Contact page content.</p><Link to="/" className="text-decoration-none text-primary mt-3">Go Home</Link></AuthCard></div>} />
          <Route path="/forgot-password" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Forgot Password"><p className="text-center text-muted">Forgot Password functionality goes here.</p><Link to="/login" className="text-decoration-none text-primary mt-3">Back to Login</Link></AuthCard></div>} />
          <Route path="/terms" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Terms of Service"><p className="text-center text-muted">Terms of Service content goes here.</p><Link to="/signup" className="text-decoration-none text-primary mt-3">Back to Sign Up</Link></AuthCard></div>} />
          <Route path="/privacy" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Privacy Policy"><p className="text-center text-muted">Privacy Policy content goes here.</p><Link to="/signup" className="text-decoration-none text-primary mt-3">Back to Sign Up</Link></AuthCard></div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
