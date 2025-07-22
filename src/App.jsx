// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import { ChevronRight, FlaskConical, History, BarChart2, ShieldCheck, Mail, Lock, User, UserPlus, LogIn, LayoutDashboard, CalendarPlus, ListChecks, FileText, Home, Info, LogOut } from 'lucide-react';
// import "./App.css"
// // You would typically include Bootstrap CSS and JS in your public/index.html like this:
// // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
// // <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

// // --- 1. Auth Context ---
// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null); // Stores basic user info like email, name
//   const navigate = useNavigate();

//   // On initial load, check if a token exists in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('jwt_token');
//     const storedUser = localStorage.getItem('user_info');
//     if (token && storedUser) {
//       try {
//         // In a real app, you'd verify the token with your backend
//         setUser(JSON.parse(storedUser));
//         setIsLoggedIn(true);
//       } catch (e) {
//         console.error("Failed to parse user info from localStorage", e);
//         logout(); // Clear invalid data
//       }
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       // Simulate API call to your backend /api/login
//       // Replace 'http://localhost:5000/api/login' with your actual backend URL
//       const response = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Simulate successful login
//         const token = data.token || 'simulated_jwt_token_123'; // Backend would send a real token
//         const userInfo = data.user || { name: 'Demo User', email: email }; // Backend would send real user info

//         localStorage.setItem('jwt_token', token);
//         localStorage.setItem('user_info', JSON.stringify(userInfo));
//         setIsLoggedIn(true);
//         setUser(userInfo);
//         navigate('/dashboard'); // Redirect to dashboard on success
//         return { success: true };
//       } else {
//         // Simulate login failure
//         const errorMessage = data.message || 'Login failed. Please check your credentials.';
//         return { success: false, error: errorMessage };
//       }
//     } catch (error) {
//       console.error('Login API call error:', error);
//       return { success: false, error: 'Network error or server unavailable.' };
//     }
//   };

//   const register = async (fullName, email, password, isCaregiver) => {
//     try {
//       // Simulate API call to your backend /api/signup
//       // Replace 'http://localhost:5000/api/signup' with your actual backend URL
//       const response = await fetch('http://localhost:5000/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: fullName, email, password, is_caregiver: isCaregiver }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Simulate successful registration
//         const token = data.token || 'simulated_jwt_token_new_user'; // Backend would send a real token
//         const userInfo = data.user || { name: fullName, email: email };

//         localStorage.setItem('jwt_token', token);
//         localStorage.setItem('user_info', JSON.stringify(userInfo));
//         setIsLoggedIn(true);
//         setUser(userInfo);
//         navigate('/dashboard'); // Redirect to dashboard on success
//         return { success: true };
//       } else {
//         // Simulate registration failure
//         const errorMessage = data.message || 'Registration failed. Please try again.';
//         return { success: false, error: errorMessage };
//       }
//     } catch (error) {
//       console.error('Registration API call error:', error);
//       return { success: false, error: 'Network error or server unavailable.' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('jwt_token');
//     localStorage.removeItem('user_info');
//     setIsLoggedIn(false);
//     setUser(null);
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // --- Common Card Wrapper for Auth Forms ---
// const AuthCard = ({ title, children }) => (
//   <div className="card shadow-lg border-0 rounded-3" style={{ maxWidth: '450px', width: '100%' }}>
//     <div className="card-body p-4 p-md-5">
//       <h2 className="card-title text-center text-primary mb-4 fw-bold">{title}</h2>
//       {children}
//     </div>
//   </div>
// );

// // --- Login Page UI Component ---
// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       setLoading(false);
//       return;
//     }

//     const result = await login(email, password);
//     if (!result.success) {
//       setError(result.error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3">
//       <AuthCard title="Welcome Back!">
//         <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//           {error && <div className="alert alert-danger text-center small" role="alert">{error}</div>}
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label small text-muted">Email Address</label>
//             <div className="input-group has-validation">
//               <span className="input-group-text"><Mail size={20} /></span>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="form-control rounded-end"
//                 placeholder="you@example.com"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <div className="invalid-feedback">Please enter a valid email.</div>
//             </div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label small text-muted">Password</label>
//             <div className="input-group has-validation">
//               <span className="input-group-text"><Lock size={20} /></span>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="form-control rounded-end"
//                 placeholder="••••••••"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div className="invalid-feedback">Please enter your password.</div>
//             </div>
//           </div>

//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 id="remember-me"
//                 name="remember-me"
//               />
//               <label className="form-check-label small text-muted" htmlFor="remember-me">
//                 Remember me
//               </label>
//             </div>
//             <div className="small">
//               <Link to="/forgot-password" className="text-decoration-none text-primary">
//                 Forgot your password?
//               </Link>
//             </div>
//           </div>

//           <div className="d-grid">
//             <button
//               type="submit"
//               className="btn btn-primary btn-lg rounded-pill shadow-sm d-flex align-items-center justify-content-center"
//               disabled={loading}
//             >
//               {loading ? 'Logging In...' : <><LogIn size={20} className="me-2" /> Log In</>}
//             </button>
//           </div>
//         </form>

//         <p className="mt-4 text-center small text-muted">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-decoration-none text-primary">
//             Sign Up
//           </Link>
//         </p>
//       </AuthCard>
//     </div>
//   );
// };

// // --- Registration Page UI Component ---
// const RegistrationPage = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isCaregiver, setIsCaregiver] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (!fullName || !email || !password || !confirmPassword) {
//       setError('All fields are required.');
//       setLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       setLoading(false);
//       return;
//     }

//     if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
//       setError('Password must be at least 8 characters, include an uppercase letter, a number, and a symbol.');
//       setLoading(false);
//       return;
//     }

//     const result = await register(fullName, email, password, isCaregiver);
//     if (!result.success) {
//       setError(result.error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3">
//       <AuthCard title="Create Your Account">
//         <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//           {error && <div className="alert alert-danger text-center small" role="alert">{error}</div>}
//           <div className="mb-3">
//             <label htmlFor="fullName" className="form-label small text-muted">Full Name</label>
//             <div className="input-group has-validation">
//               <span className="input-group-text"><User size={20} /></span>
//               <input
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 className="form-control rounded-end"
//                 placeholder="John Doe"
//                 required
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//               />
//               <div className="invalid-feedback">Please enter your full name.</div>
//             </div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label small text-muted">Email Address</label>
//             <div className="input-group has-validation">
//               <span className="input-group-text"><Mail size={20} /></span>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="form-control rounded-end"
//                 placeholder="you@example.com"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <div className="invalid-feedback">Please enter a valid email.</div>
//             </div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label small text-muted">Password</label>
//             <div className="input-group has-validation">
//               <span className="input-group-text"><Lock size={20} /></span>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="form-control rounded-end"
//                 placeholder="••••••••"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div className="invalid-feedback">Please enter a password.</div>
//             </div>
//             <div className="form-text small text-muted">Min. 8 characters, with uppercase, number, and symbol.</div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="confirmPassword" className="form-label small text-muted">Confirm Password</label>
//             <div className="input-group has-validation">
//               <span className="input-group-text"><Lock size={20} /></span>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 className="form-control rounded-end"
//                 placeholder="••••••••"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <div className="invalid-feedback">Please confirm your password.</div>
//             </div>
//           </div>

//           <div className="form-check mb-3">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="isCaregiver"
//               name="isCaregiver"
//               checked={isCaregiver}
//               onChange={(e) => setIsCaregiver(e.target.checked)}
//             />
//             <label className="form-check-label small text-muted" htmlFor="isCaregiver">
//               I am a caregiver
//             </label>
//           </div>

//           <div className="form-check mb-4">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="terms"
//               name="terms"
//               required
//             />
//             <label className="form-check-label small text-muted" htmlFor="terms">
//               I agree to the{' '}
//               <Link to="/terms" className="text-decoration-none text-primary">
//                 Terms of Service
//               </Link>{' '}
//               and{' '}
//               <Link to="/privacy" className="text-decoration-none text-primary">
//                 Privacy Policy
//               </Link>
//             </label>
//             <div className="invalid-feedback">You must agree to the terms.</div>
//           </div>

//           <div className="d-grid">
//             <button
//               type="submit"
//               className="btn btn-primary btn-lg rounded-pill shadow-sm d-flex align-items-center justify-content-center"
//               disabled={loading}
//             >
//               {loading ? 'Signing Up...' : <><UserPlus size={20} className="me-2" /> Sign Up</>}
//             </button>
//           </div>
//         </form>

//         <p className="mt-4 text-center small text-muted">
//           Already have an account?{' '}
//           <Link to="/login" className="text-decoration-none text-primary">
//             Log In
//           </Link>
//         </p>
//       </AuthCard>
//     </div>
//   );
// };

// // --- Home Page UI Component ---
// const HomePage = () => {
//   const { isLoggedIn, logout } = useContext(AuthContext);

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-blue">
//       {/* Header/Navigation Bar */}
//       <header className="navbar navbar-expand-md navbar-light bg-white shadow-sm sticky-top">
//         <div className="container-fluid container-md">
//           {/* Logo/Site Title */}
//           <Link to="/" className="navbar-brand d-flex align-items-center">
//             <img src="https://placehold.co/40x40/6366F1/FFFFFF?text=AI" alt="RareJournal AI Logo" className="rounded-circle me-2" />
//             <span className="h4 mb-0 text-primary fw-bold">RareJournal AI</span>
//           </Link>

//           {/* Mobile Toggler */}
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Navigation Links */}
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-md-center">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link d-flex align-items-center me-3">
//                   <Home size={18} className="me-1" /> Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/features" className="nav-link d-flex align-items-center me-3">
//                   <FlaskConical size={18} className="me-1" /> Features
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/about" className="nav-link d-flex align-items-center me-3">
//                   <Info size={18} className="me-1" /> About Us
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/contact" className="nav-link d-flex align-items-center me-3">
//                   <Mail size={18} className="me-1" /> Contact
//                 </Link>
//               </li>

//               {/* Conditional Auth Links */}
//               {!isLoggedIn ? (
//                 <>
//                   <li className="nav-item mt-2 mt-md-0 me-md-2">
//                     <Link to="/signup" className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center">
//                       <UserPlus size={18} className="me-1" /> Sign Up
//                     </Link>
//                   </li>
//                   <li className="nav-item mt-2 mt-md-0">
//                     <Link to="/login" className="btn btn-outline-primary rounded-pill d-flex align-items-center justify-content-center">
//                       <LogIn size={18} className="me-1" /> Log In
//                     </Link>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/dashboard" className="nav-link d-flex align-items-center me-3">
//                       <LayoutDashboard size={18} className="me-1" /> Dashboard
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/add-symptom" className="nav-link d-flex align-items-center me-3">
//                       <CalendarPlus size={18} className="me-1" /> Log Symptom
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/symptom-history" className="nav-link d-flex align-items-center me-3">
//                       <ListChecks size={18} className="me-1" /> History
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reports" className="nav-link d-flex align-items-center me-3">
//                       <FileText size={18} className="me-1" /> Reports
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/profile" className="nav-link d-flex align-items-center me-3">
//                       <User size={18} className="me-1" /> Profile
//                     </Link>
//                   </li>
//                   <li className="nav-item mt-2 mt-md-0">
//                     <button
//                       onClick={logout}
//                       className="btn btn-danger rounded-pill d-flex align-items-center justify-content-center"
//                     >
//                       <LogOut size={18} className="me-1" /> Logout
//                     </button>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </header>

//       <main className="flex-grow-1">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-primary to-purple text-white py-5 px-3 text-center rounded-bottom-4 shadow-lg">
//           <div className="container-md mx-auto" style={{ maxWidth: '900px' }}>
//             <h1 className="display-4 fw-bold lh-base mb-3 animate-fade-in-up">
//               Empowering Your Journey with Rare Conditions with <span className="text-warning">AI-Powered Insights</span>
//             </h1>
//             <p className="lead mb-4 opacity-90 animate-fade-in-up delay-100">
//               Track, Analyze, and Understand Your Symptoms Like Never Before.
//             </p>
//             <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
//               <Link
//                 to="/signup"
//                 className="btn btn-light btn-lg rounded-pill shadow-sm d-flex align-items-center justify-content-center"
//               >
//                 Get Started - Sign Up Free
//                 <ChevronRight size={20} className="ms-2" />
//               </Link>
//               <a
//                 href="#features-overview"
//                 className="btn btn-outline-light btn-lg rounded-pill border-2 d-flex align-items-center justify-content-center"
//               >
//                 Learn More
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* Features Overview Section */}
//         <section id="features-overview" className="py-5 px-3 bg-white">
//           <div className="container-md mx-auto text-center">
//             <h2 className="display-5 fw-bold text-dark mb-5">Key Features Designed for You</h2>
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
//               {/* Feature Card 1: Symptom Tracking */}
//               <div className="col">
//                 <div className="card h-100 shadow-sm border-0 rounded-3">
//                   <div className="card-body p-4 text-center">
//                     <div className="text-primary mb-3">
//                       <CalendarPlus size={48} className="mx-auto" />
//                     </div>
//                     <h3 className="h5 card-title fw-semibold mb-2">Intuitive Symptom Logging</h3>
//                     <p className="card-text text-muted">
//                       Easily record your symptoms with detailed descriptions, severity levels, and associated factors.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Feature Card 2: AI Insights */}
//               <div className="col">
//                 <div className="card h-100 shadow-sm border-0 rounded-3">
//                   <div className="card-body p-4 text-center">
//                     <div className="text-purple mb-3">
//                       <FlaskConical size={48} className="mx-auto" />
//                     </div>
//                     <h3 className="h5 card-title fw-semibold mb-2">Basic AI-Powered Insights</h3>
//                     <p className="card-text text-muted">
//                       Identify patterns and trends in your symptoms to better understand your condition.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Feature Card 3: Historical Tracking */}
//               <div className="col">
//                 <div className="card h-100 shadow-sm border-0 rounded-3">
//                   <div className="card-body p-4 text-center">
//                     <div className="text-success mb-3">
//                       <History size={48} className="mx-auto" />
//                     </div>
//                     <h3 className="h5 card-title fw-semibold mb-2">Comprehensive History</h3>
//                     <p className="card-text text-muted">
//                       View and manage all your past symptom entries in one organized place.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Feature Card 4: Data Visualization */}
//               <div className="col">
//                 <div className="card h-100 shadow-sm border-0 rounded-3">
//                   <div className="card-body p-4 text-center">
//                     <div className="text-info mb-3">
//                       <BarChart2 size={48} className="mx-auto" />
//                     </div>
//                     <h3 className="h5 card-title fw-semibold mb-2">Visual Reports</h3>
//                     <p className="card-text text-muted">
//                       Generate simple reports and charts to visualize symptom frequency and severity over time.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="py-5 px-3 bg-light">
//           <div className="container-md mx-auto text-center" style={{ maxWidth: '700px' }}>
//             <h2 className="display-5 fw-bold text-dark mb-5">How It Works</h2>
//             <div className="d-flex flex-column gap-4">
//               {/* Step 1 */}
//               <div className="d-flex flex-column flex-md-row align-items-center text-md-start bg-white p-4 rounded-3 shadow-sm">
//                 <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-primary text-white rounded-circle me-md-4 mb-3 mb-md-0" style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}>
//                   1
//                 </div>
//                 <div>
//                   <h3 className="h4 fw-semibold text-dark mb-2">Log Your Symptoms</h3>
//                   <p className="text-muted mb-0">
//                     Quickly and easily record every detail about your symptoms, including date, time, severity, and any contributing factors. Our intuitive forms make it simple.
//                   </p>
//                 </div>
//               </div>

//               {/* Step 2 */}
//               <div className="d-flex flex-column flex-md-row align-items-center text-md-start bg-white p-4 rounded-3 shadow-sm">
//                 <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-purple text-white rounded-circle me-md-4 mb-3 mb-md-0" style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}>
//                   2
//                 </div>
//                 <div>
//                   <h3 className="h4 fw-semibold text-dark mb-2">Gain Basic AI Insights</h3>
//                   <p className="text-muted mb-0">
//                     Our system helps you identify patterns and trends within your logged data, offering a clearer picture of your health journey.
//                   </p>
//                 </div>
//               </div>

//               {/* Step 3 */}
//               <div className="d-flex flex-column flex-md-row align-items-center text-md-start bg-white p-4 rounded-3 shadow-sm">
//                 <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-success text-white rounded-circle me-md-4 mb-3 mb-md-0" style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}>
//                   3
//                 </div>
//                 <div>
//                   <h3 className="h4 fw-semibold text-dark mb-2">Share & Discuss</h3>
//                   <p className="text-muted mb-0">
//                     Generate comprehensive reports from your data to share with your healthcare providers, facilitating more informed discussions and better care.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action before Footer */}
//         <section className="bg-primary text-white py-5 px-3 text-center rounded-top-4 shadow-lg">
//           <div className="container-md mx-auto" style={{ maxWidth: '700px' }}>
//             <h2 className="display-5 fw-bold mb-3">Ready to Take Control of Your Health Journey?</h2>
//             <p className="lead mb-4 opacity-90">
//               Join RareJournal AI today and start tracking your symptoms with confidence.
//             </p>
//             <Link
//               to="/signup"
//               className="btn btn-light btn-lg rounded-pill shadow-sm d-flex align-items-center justify-content-center mx-auto"
//               style={{ maxWidth: '300px' }}
//             >
//               Sign Up Now - It's Free!
//               <ChevronRight size={20} className="ms-2" />
//             </Link>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-dark text-white py-4 px-3 text-center">
//         <div className="container-md mx-auto">
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
//             <div className="small mb-2 mb-md-0">
//               &copy; {new Date().getFullYear()} RareJournal AI. All rights reserved.
//             </div>
//             <div className="d-flex gap-3">
//               <Link to="/privacy" className="text-white-50 text-decoration-none small">Privacy Policy</Link>
//               <Link to="/terms" className="text-white-50 text-decoration-none small">Terms of Service</Link>
//               <Link to="/contact" className="text-white-50 text-decoration-none small">Support</Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // --- Placeholder for Dashboard Page ---
// const DashboardPage = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // This is a very basic protected route. In a real app, you'd check token validity with backend.
//     if (!user) {
//       navigate('/login'); // Redirect if not logged in
//     }
//   }, [user, navigate]);

//   if (!user) {
//     return null; // Or a loading spinner
//   }

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3">
//       <AuthCard title={`Welcome, ${user.name || user.email}! 👋`}>
//         <p className="text-center lead mb-3">This is your Dashboard.</p>
//         <p className="text-center text-muted mb-4">
//           You are logged in as: <span className="fw-semibold">{user.email}</span>
//         </p>
//         <div className="d-grid gap-3">
//           <Link to="/" className="btn btn-primary btn-lg rounded-pill d-flex align-items-center justify-content-center">
//             Go to Home Page
//             <ChevronRight size={20} className="ms-2" />
//           </Link>
//           <button
//             onClick={logout}
//             className="btn btn-outline-danger btn-lg rounded-pill d-flex align-items-center justify-content-center"
//           >
//             <LogOut size={20} className="me-2" />
//             Logout
//           </button>
//         </div>
//       </AuthCard>
//     </div>
//   );
// };


// // --- Main App component that handles routing and provides AuthContext ---
// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<RegistrationPage />} />
//           <Route path="/dashboard" element={<DashboardPage />} /> {/* Protected route example */}

//           {/* Placeholder routes for future pages */}
//           <Route path="/features" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Features Page"><p className="text-center text-muted">This will be the Features page content.</p><Link to="/" className="text-decoration-none text-primary mt-3">Go Home</Link></AuthCard></div>} />
//           <Route path="/about" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="About Us Page"><p className="text-center text-muted">This will be the About Us page content.</p><Link to="/" className="text-decoration-none text-primary mt-3">Go Home</Link></AuthCard></div>} />
//           <Route path="/contact" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Contact Page"><p className="text-center text-muted">This will be the Contact page content.</p><Link to="/" className="text-decoration-none text-primary mt-3">Go Home</Link></AuthCard></div>} />
//           <Route path="/forgot-password" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Forgot Password"><p className="text-center text-muted">Forgot Password functionality goes here.</p><Link to="/login" className="text-decoration-none text-primary mt-3">Back to Login</Link></AuthCard></div>} />
//           <Route path="/terms" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Terms of Service"><p className="text-center text-muted">Terms of Service content goes here.</p><Link to="/signup" className="text-decoration-none text-primary mt-3">Back to Sign Up</Link></AuthCard></div>} />
//           <Route path="/privacy" element={<div className="d-flex flex-column min-vh-100 bg-light justify-content-center align-items-center p-3"><AuthCard title="Privacy Policy"><p className="text-center text-muted">Privacy Policy content goes here.</p><Link to="/signup" className="text-decoration-none text-primary mt-3">Back to Sign Up</Link></AuthCard></div>} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;




































import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, FlaskConical, History, BarChart2, ShieldCheck, Mail, Lock, User, UserPlus, LogIn, LayoutDashboard, CalendarPlus, ListChecks, FileText, Home, Info, LogOut } from 'lucide-react';

// --- Enhanced Custom CSS Styles (Solid Colors & Cute UI with Animated Icons) ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;600;700&display=swap');

  :root {
    /* New Solid Color Palette based on image */
    --primary-blue-teal: #0f6185; /* Original Dark Teal/Blue from image */
    --primary-blue-teal-dark: #0c4e6a; /* Original Darker shade for hover */
    --secondary-pink-purple: #df74ab; /* Vibrant Pink/Magenta from image */
    --secondary-pink-purple-dark: #c86194; /* Darker shade for hover */

    /* New banner background color */
    --banner-background-color: #4f72ff;
    --banner-background-color-dark: #3a5ae0; /* Slightly darker for CTA if needed */

    --accent-yellow: #FACC15;
    --accent-green: #22C55E;
    --accent-blue: #3B82F6;

    --text-color-dark: #1F2937;
    --text-color-medium: #4B5563;
    --text-color-light: #6B7280;

    --bg-main: #FDFBFC; /* Very light, almost white, with a hint of pink */
    --bg-white: #FFFFFF;
    --border-color-light: #E5E7EB;
    --shadow-color-light: rgba(0,0,0,0.08);
    --shadow-color-medium: rgba(0,0,0,0.15);
    --shadow-color-strong: rgba(0,0,0,0.25);

    --red-color: #EF4444;
    --red-color-dark: #DC2626;

    /* Auth Page Specific Background Solid Color */
    --auth-bg-color: #F8EBF2; /* Light, desaturated pink */
  }

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--bg-main);
    color: var(--text-color-dark);
    line-height: 1.6;
  }

  /* Base Layout */
  .min-h-screen-root { min-height: 100vh; display: flex; flex-direction: column; }
  .flex-col { flex-direction: column; }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex-align-center {
    display: flex;
    align-items: center;
  }
  .container-custom {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  /* Responsive adjustments for container */
  @media (min-width: 768px) {
    .container-custom {
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Removed slideInUp for text elements in hero section */
  /* @keyframes slideInUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  } */

  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(0deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }

  @keyframes pulse {
    0% { transform: opacity: 0.8; }
    50% { transform: opacity: 1; }
    100% { transform: opacity: 0.8; }
  }

  /* Removed animate-fade-in-up class for text elements in hero section */
  /* .animate-fade-in-up {
    animation: slideInUp 0.8s ease-out forwards;
    opacity: 0;
  }
  .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
  .animate-fade-in-up.delay-200 { animation-delay: 0.2s; } */

  /* General Transitions */
  .transition-all-custom {
    transition: all 0.3s ease-in-out;
  }

  /* Header */
  .header-custom {
    background-color: var(--bg-white);
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .logo-text {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary-blue-teal);
    letter-spacing: -0.5px;
  }

  .nav-links-desktop {
    display: none;
    align-items: center;
    gap: 1.8rem;
  }
  @media (min-width: 768px) {
    .nav-links-desktop {
      display: flex;
    }
  }

  .nav-link-item {
    color: var(--text-color-medium);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 500;
    transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
  }
  .nav-link-item:hover {
    color: var(--primary-blue-teal);
    transform: translateY(-2px);
  }

  .mobile-menu-button {
    display: block;
    color: var(--text-color-medium);
    padding: 0.6rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    border: none;
    background: none;
    cursor: pointer;
  }
  .mobile-menu-button:hover {
    background-color: rgba(0,0,0,0.08);
    color: var(--primary-blue-teal);
  }
  @media (min-width: 768px) {
    .mobile-menu-button {
      display: none;
    }
  }

  /* Hero Section */
  .hero-section-custom {
    background-color: var(--banner-background-color); /* Changed to new banner color */
    color: white;
    padding: 6rem 1.5rem;
    text-align: center;
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
    box-shadow: 0 15px 30px var(--shadow-color-strong);
    position: relative;
    overflow: hidden;
    /* Animated background icons */
    background-image:
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-syringe"><path d="m18 12 4-4"/><path d="m17 11 0.7-0.7c1-1 1-2.5 0-3.4l-2.6-2.6c-1-1-2.5-1-3.4 0L11 7"/><path d="m17 11-5 5c-0.3 0.3-0.7 0.4-1 0.4H3.5c-0.8 0-1.5-0.7-1.5-1.5v-3c0-0.3 0.1-0.7 0.4-1l5-5"/><path d="M4 20l1.5-1.5"/><path d="M14.4 14.4 9.5 9.5"/></svg>'),
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stethoscope"><path d="M18 15v-3a6 6 0 0 0-6-6H4"/><path d="M12 9v11a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5"/><path d="M12 3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2"/><path d="M12 22v-8"/><path d="M20 10H10"/></svg>'),
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-microscope"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"/><path d="M12 12L10 2l-.7 3.9A2 2 0 0 1 7.1 7H5.2c-.9 0-1.7.5-2.1 1.3L2 10"/><path d="M17 12l2-10l.7 3.9a2 2 0 0 1 2.2 1.1h1.9c.9 0 1.7.5 2.1 1.3L22 10"/><path d="M12 22V16"/><path d="M12 2h0"/></svg>'),
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thermometer"><path d="M8.5 14.5V4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v10.5"/><path d="M10.5 16.5a2.5 2.5 0 0 0 5 0V5.5H10.5v11Z"/><path d="M12.5 6.5h-1"/><path d="M12.5 10.5h-1"/><path d="M12.5 14.5h-1"/><path d="M12.5 18.5a2.5 2.5 0 0 1-5 0V3.5h5v15Z"/></svg>');
    background-repeat: no-repeat;
    background-size: 40px, 35px, 45px, 30px; /* Sizes for each icon */
    background-position:
      10% 20%, /* syringe */
      80% 15%, /* stethoscope */
      25% 70%, /* microscope */
      90% 80%; /* thermometer */
    // animation:
    //   float 8s ease-in-out infinite alternate,
    //   pulse 5s ease-in-out infinite alternate,
    //   float 7s ease-in-out infinite alternate 1s,
    //   pulse 6s ease-in-out infinite alternate 0.5s;
    z-index: 0; /* Ensure icons are behind content */
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }
  .hero-title {
    font-family: 'Poppins', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    /* Removed animation classes */
    animation: none;
    opacity: 1;
    transform: none;
  }
  @media (min-width: 768px) {
    .hero-title {
      font-size: 4.5rem;
    }
  }
  .hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
    opacity: 0.95;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    /* Removed animation classes */
    animation: none;
    opacity: 1;
    transform: none;
  }
  @media (min-width: 768px) {
    .hero-subtitle {
      font-size: 1.5rem;
    }
  }
  .hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    justify-content: center;
    /* Removed animation classes */
    animation: none;
    opacity: 1;
    transform: none;
  }
  @media (min-width: 640px) {
    .hero-buttons {
      flex-direction: row;
      gap: 1.5rem;
    }
  }

  /* Buttons */
  .btn-primary-custom {
    background-color: var(--bg-white);
    color: var(--primary-blue-teal);
    padding: 1rem 2.2rem;
    border-radius: 9999px;
    font-weight: 700;
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: none;
    cursor: pointer;
  }
  .btn-primary-custom:hover {
    background-color: var(--bg-main);
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  .btn-primary-custom:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .btn-outline-primary-custom {
    border: 2px solid white;
    color: white;
    background-color: transparent;
    padding: 1rem 2.2rem;
    border-radius: 9999px;
    font-weight: 700;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
  }
  .btn-outline-primary-custom:hover {
    background-color: white;
    color: var(--primary-blue-teal);
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 25px rgba(255,255,255,0.2);
  }
  .btn-outline-primary-custom:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(255,255,255,0.1);
  }

  .btn-secondary-custom {
    background-color: var(--primary-blue-teal); /* Solid color */
    border: none;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(15, 97, 133, 0.3); /* Adjusted shadow color */
    transition: all 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
  }
  .btn-secondary-custom:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(15, 97, 133, 0.4); /* Adjusted shadow color */
    opacity: 0.95;
  }
  .btn-secondary-custom:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(15, 97, 133, 0.2); /* Adjusted shadow color */
  }
  .btn-secondary-custom:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .btn-outline-secondary-custom {
    border: 2px solid var(--primary-blue-teal);
    color: var(--primary-blue-teal);
    background-color: var(--bg-white);
    padding: 0.8rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
  }
  .btn-outline-secondary-custom:hover {
    background-color: var(--primary-blue-teal);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(15, 97, 133, 0.2); /* Adjusted shadow color */
  }
  .btn-outline-secondary-custom:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .btn-danger-custom {
    background-color: var(--red-color);
    border: none;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    transition: all 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
  }
  .btn-danger-custom:hover {
    background-color: var(--red-color-dark);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
  }
  .btn-danger-custom:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(239, 68, 68, 0.2);
  }

  /* Section Titles */
  .section-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-color-dark);
    margin-bottom: 3.5rem;
    position: relative;
    display: inline-block;
  }
  .section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: var(--primary-blue-teal); /* Solid color */
    margin: 10px auto 0;
    border-radius: 2px;
  }
  @media (min-width: 768px) {
    .section-title {
      font-size: 3rem;
    }
  }

  /* Features Section */
  .features-section-custom {
    padding: 5rem 1.5rem;
    background-color: var(--bg-white);
    text-align: center;
  }
  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .feature-card-custom {
    background-color: var(--bg-white);
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 8px 20px var(--shadow-color-light);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.4s;
    border: 1px solid var(--border-color-light);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .feature-card-custom:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    border-color: var(--primary-blue-teal);
  }
  .feature-icon-wrapper {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: var(--primary-blue-teal); /* Solid color */
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: 0 4px 10px rgba(15, 97, 133, 0.3);
    transition: transform 0.3s ease-in-out;
  }
  .feature-card-custom:hover .feature-icon-wrapper {
    transform: scale(1.1);
  }
  .feature-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-color-dark);
  }
  .feature-description {
    color: var(--text-color-medium);
    font-size: 0.95rem;
  }

  /* How It Works Section */
  .how-it-works-section-custom {
    padding: 5rem 1.5rem;
    background-color: var(--bg-main);
    text-align: center;
  }
  .how-it-works-steps {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .how-it-works-step-custom {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: var(--bg-white);
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .how-it-works-step-custom:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.12);
  }
  @media (min-width: 768px) {
    .how-it-works-step-custom {
      flex-direction: row;
      text-align: left;
      align-items: flex-start;
      gap: 2.5rem;
    }
  }
  .step-number-circle {
    flex-shrink: 0;
    width: 4.5rem;
    height: 4.5rem;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    transition: transform 0.3s ease-in-out;
  }
  .how-it-works-step-custom:hover .step-number-circle {
    transform: scale(1.05);
  }
  @media (min-width: 768px) {
    .step-number-circle {
      margin-bottom: 0;
    }
  }
  .step-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.6rem;
    color: var(--text-color-dark);
  }
  .step-description {
    color: var(--text-color-medium);
    font-size: 1rem;
  }

  /* Call to Action Section */
  .cta-section-custom {
    background-color: var(--banner-background-color-dark); /* Using darker shade of new banner color */
    color: white;
    padding: 5rem 1.5rem;
    text-align: center;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    box-shadow: 0 -15px 30px var(--shadow-color-strong);
    position: relative;
    overflow: hidden;
  }
  .cta-section-custom::before {
    content: none; /* Removed pseudo-element for gradients/animations */
  }
  .cta-content {
    position: relative;
    z-index: 1;
  }
  .cta-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
  }
  @media (min-width: 768px) {
    .cta-title {
      font-size: 3rem;
    }
  }
  .cta-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    opacity: 0.95;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Footer */
  .footer-custom {
    background-color: var(--text-color-dark);
    color: white;
    padding: 2.5rem 1.5rem;
    text-align: center;
  }
  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
    justify-content: space-between;
  }
  @media (min-width: 768px) {
    .footer-content {
      flex-direction: row;
      gap: 0;
    }
  }
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  .footer-link-item {
    color: var(--text-color-light);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease-in-out;
  }
  .footer-link-item:hover {
    color: white;
    text-decoration: underline;
  }

  /* Auth Pages */
  .auth-page-container {
    min-height: 100vh;
    background-color: var(--auth-bg-color); /* Solid color */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }
  .auth-card-custom {
    background-color: var(--bg-white);
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 15px 30px var(--shadow-color-light);
    width: 100%;
    max-width: 480px;
    border: 1px solid var(--border-color-light);
    animation: fadeIn 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
  }
  .auth-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    color: var(--primary-blue-teal);
    margin-bottom: 2rem;
  }
  .form-group-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .form-group {
    margin-bottom: 0;
  }
  .form-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-color-medium);
    margin-bottom: 0.4rem;
  }
  .input-field-wrapper {
    position: relative;
  }
  .input-field-icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: var(--text-color-light);
    pointer-events: none;
  }
  .input-field-custom {
    display: block;
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 3rem;
    border: 1px solid var(--border-color-light);
    border-radius: 0.6rem;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    font-size: 1rem;
  }
  .input-field-custom:focus {
    outline: none;
    border-color: var(--primary-blue-teal);
    box-shadow: 0 0 0 4px rgba(15, 97, 133, 0.2);
  }
  .form-text-hint {
    margin-top: 0.3rem;
    font-size: 0.8rem;
    color: var(--text-color-medium);
  }
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }
  .checkbox-custom {
    height: 1.1rem;
    width: 1.1rem;
    accent-color: var(--primary-blue-teal);
    border: 1px solid var(--border-color-light);
    border-radius: 0.25rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  .checkbox-custom:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(15, 97, 133, 0.25);
  }
  .checkbox-label {
    margin-left: 0.6rem;
    font-size: 0.9rem;
    color: var(--text-color-dark);
  }
  .form-bottom-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .text-link-small {
    font-size: 0.9rem;
  }
  .text-center-small {
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-color-medium);
    margin-top: 1.5rem;
  }
  .error-message {
    color: var(--red-color);
    font-size: 0.85rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  /* Utility classes for spacing and alignment */
  .w-full { width: 100%; }
  .mr-2 { margin-right: 0.5rem; }
  .ml-2 { margin-left: 0.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mt-3 { margin-top: 0.75rem; }
  .rounded-full { border-radius: 9999px; }
  .font-semibold { font-weight: 600; }
  .text-sm { font-size: 0.875rem; }
  .text-lg { font-size: 1.125rem; }
  .text-center { text-align: center; }
  .opacity-90 { opacity: 0.9; }
  .max-w-4xl-custom { max-width: 900px; }
  .max-w-3xl-custom { max-width: 700px; }

  /* Specific color classes for icons/text */
  .text-primary-blue-teal-custom { color: var(--primary-blue-teal); }
  .text-secondary-pink-purple-custom { color: var(--secondary-pink-purple); }
  .bg-primary-blue-teal-custom { background-color: var(--primary-blue-teal); }
  .bg-secondary-pink-purple-custom { background-color: var(--secondary-pink-purple); }
  .text-yellow-custom { color: var(--accent-yellow); }
  .text-green-custom { color: var(--accent-green); }
  .text-blue-custom { color: var(--accent-blue); }
`;

// --- 1. Auth Context (Same as before) ---
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user_info');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
        logout();
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Simulated API call
      const response = await new Promise(resolve => setTimeout(() => {
        if (email === 'test@example.com' && password === 'Password123!') {
          resolve({ ok: true, json: () => Promise.resolve({ token: 'simulated_jwt_token', user: { name: 'Test User', email } }) });
        } else {
          resolve({ ok: false, json: () => Promise.resolve({ message: 'Invalid credentials.' }) });
        }
      }, 1000)); // Simulate network delay

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user_info', JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUser(data.user);
        navigate('/dashboard');
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Login failed.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error or server unavailable.' };
    }
  };

  const register = async (fullName, email, password, isCaregiver) => {
    try {
      // Simulated API call
      const response = await new Promise(resolve => setTimeout(() => {
        if (email === 'existing@example.com') { // Simulate existing user
          resolve({ ok: false, json: () => Promise.resolve({ message: 'Email already registered.' }) });
        } else {
          resolve({ ok: true, json: () => Promise.resolve({ token: 'simulated_jwt_token_new_user', user: { name: fullName, email } }) });
        }
      }, 1000)); // Simulate network delay

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user_info', JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUser(data.user);
        navigate('/dashboard');
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Registration failed.' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error or server unavailable.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Common Card Wrapper for Auth Forms ---
const AuthCard = ({ title, children }) => (
  <div className="auth-card-custom">
    <h2 className="auth-title">{title}</h2>
    {children}
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
    <div className="auth-page-container">
      <AuthCard title="Welcome Back!">
        <form onSubmit={handleSubmit} className="form-group-container">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-field-wrapper">
              <div className="input-field-icon">
                <Mail size={20} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field-custom"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-field-wrapper">
              <div className="input-field-icon">
                <Lock size={20} />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field-custom"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="form-bottom-links">
            <div className="checkbox-wrapper">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox-custom"
              />
              <label htmlFor="remember-me" className="checkbox-label">
                Remember me
              </label>
            </div>
            <div className="text-link-small">
              <Link to="/forgot-password" className="link-custom">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="form-group">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-secondary-custom"
            >
              {loading ? 'Logging In...' : <><LogIn size={20} className="mr-2" /> Log In</>}
            </button>
          </div>
        </form>

        <p className="text-center-small">
          Don't have an account?{' '}
          <Link to="/signup" className="link-custom">
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
    <div className="auth-page-container">
      <AuthCard title="Create Your Account">
        <form onSubmit={handleSubmit} className="form-group-container">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <div className="input-field-wrapper">
              <div className="input-field-icon">
                <User size={20} />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field-custom"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-field-wrapper">
              <div className="input-field-icon">
                <Mail size={20} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field-custom"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-field-wrapper">
              <div className="input-field-icon">
                <Lock size={20} />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field-custom"
                placeholder="••••••••"
              />
            </div>
            <p className="form-text-hint">Min. 8 characters, with uppercase, number, and symbol.</p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-field-wrapper">
              <div className="input-field-icon">
                <Lock size={20} />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field-custom"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="checkbox-wrapper form-group">
            <input
              id="isCaregiver"
              name="isCaregiver"
              type="checkbox"
              checked={isCaregiver}
              onChange={(e) => setIsCaregiver(e.target.checked)}
              className="checkbox-custom"
            />
            <label htmlFor="isCaregiver" className="checkbox-label">
              I am a caregiver
            </label>
          </div>

          <div className="checkbox-wrapper form-group">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="checkbox-custom"
            />
            <label htmlFor="terms" className="checkbox-label">
              I agree to the{' '}
              <Link to="/terms" className="link-custom">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="link-custom">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div className="form-group">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-secondary-custom"
            >
              {loading ? 'Signing Up...' : <><UserPlus size={20} className="mr-2" /> Sign Up</>}
            </button>
          </div>
        </form>

        <p className="text-center-small">
          Already have an account?{' '}
          <Link to="/login" className="link-custom">
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
    <div className="min-h-screen-root">
      {/* Inject custom styles */}
      <style>{customStyles}</style>

      {/* Header/Navigation Bar */}
      <header className="header-custom">
        <nav className="container-custom flex-between">
          {/* Logo/Site Title */}
          <div className="flex-align-center">
            <img src="https://placehold.co/40x40/0F6185/FFFFFF?text=AI" alt="RareJournal AI Logo" className="rounded-full mr-2" />
            <span className="logo-text">RareJournal AI</span>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="nav-links-desktop">
            <Link to="/" className="nav-link-item">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/features" className="nav-link-item">
              <FlaskConical size={18} />
              <span>Features</span>
            </Link>
            <Link to="/about" className="nav-link-item">
              <Info size={18} />
              <span>About Us</span>
            </Link>
            <Link to="/contact" className="nav-link-item">
              <Mail size={18} />
              <span>Contact</span>
            </Link>

            {/* Conditional Auth Links */}
            {!isLoggedIn ? (
              <>
                <Link to="/signup" className="btn-secondary-custom">
                  <UserPlus size={18} className="mr-2" />
                  <span>Sign Up</span>
                </Link>
                <Link to="/login" className="btn-outline-secondary-custom">
                  <LogIn size={18} className="mr-2" />
                  <span>Log In</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-link-item"><LayoutDashboard size={18} /><span>Dashboard</span></Link>
                <Link to="/add-symptom" className="nav-link-item"><CalendarPlus size={18} /><span>Log Symptom</span></Link>
                <Link to="/symptom-history" className="nav-link-item"><ListChecks size={18} /><span>History</span></Link>
                <Link to="/reports" className="nav-link-item"><FileText size={18} /><span>Reports</span></Link>
                <Link to="/profile" className="nav-link-item"><User size={18} /><span>Profile</span></Link>
                <button
                  onClick={logout}
                  className="btn-danger-custom"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <button className="mobile-menu-button">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section-custom">
          <div className="container-custom hero-content">
            <h1 className="hero-title"> {/* Removed animation classes */}
              Empowering Your Journey with Rare Conditions with <span className="text-secondary-pink-purple-custom">AI-Powered Insights</span> {/* Used pink for accent */}
            </h1>
            <p className="hero-subtitle"> {/* Removed animation classes */}
              Track, Analyze, and Understand Your Symptoms Like Never Before.
            </p>
            <div className="hero-buttons"> {/* Removed animation classes */}
              <Link
                to="/signup"
                className="btn-primary-custom"
              >
                Get Started - Sign Up Free
                <ChevronRight size={20} className="ml-2" />
              </Link>
              <a
                href="#features-overview"
                className="btn-outline-primary-custom"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Overview Section */}
        <section id="features-overview" className="features-section-custom">
          <div className="container-custom text-center">
            <h2 className="section-title">Key Features Designed for You</h2>
            <div className="features-grid">
              {/* Feature Card 1: Symptom Tracking */}
              <div className="feature-card-custom">
                <div className="text-primary-blue-teal-custom feature-icon-wrapper">
                  <CalendarPlus size={48} />
                </div>
                <h3 className="feature-title">Intuitive Symptom Logging</h3>
                <p className="feature-description">
                  Easily record your symptoms with detailed descriptions, severity levels, and associated factors.
                </p>
              </div>

              {/* Feature Card 2: AI Insights */}
              <div className="feature-card-custom">
                <div className="text-secondary-pink-purple-custom feature-icon-wrapper">
                  <FlaskConical size={48} />
                </div>
                <h3 className="feature-title">Basic AI-Powered Insights</h3>
                <p className="feature-description">
                  Identify patterns and trends in your symptoms to better understand your condition.
                </p>
              </div>

              {/* Feature Card 3: Historical Tracking */}
              <div className="feature-card-custom">
                <div className="text-primary-blue-teal-custom feature-icon-wrapper"> {/* Alternating colors */}
                  <History size={48} />
                </div>
                <h3 className="feature-title">Comprehensive History</h3>
                <p className="feature-description">
                  View and manage all your past symptom entries in one organized place.
                </p>
              </div>

              {/* Feature Card 4: Data Visualization */}
              <div className="feature-card-custom">
                <div className="text-secondary-pink-purple-custom feature-icon-wrapper"> {/* Alternating colors */}
                  <BarChart2 size={48} />
                </div>
                <h3 className="feature-title">Visual Reports</h3>
                <p className="feature-description">
                  Generate simple reports and charts to visualize symptom frequency and severity over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section-custom">
          <div className="container-custom max-w-3xl-custom text-center">
            <h2 className="section-title">How It Works</h2>
            <div className="how-it-works-steps">
              {/* Step 1 */}
              <div className="how-it-works-step-custom">
                <div className="step-number-circle bg-primary-blue-teal-custom">
                  1
                </div>
                <div>
                  <h3 className="step-title">Log Your Symptoms</h3>
                  <p className="step-description">
                    Quickly and easily record every detail about your symptoms, including date, time, severity, and any contributing factors. Our intuitive forms make it simple.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="how-it-works-step-custom">
                <div className="step-number-circle bg-secondary-pink-purple-custom">
                  2
                </div>
                <div>
                  <h3 className="step-title">Gain Basic AI Insights</h3>
                  <p className="step-description">
                    Our system helps you identify patterns and trends within your logged data, offering a clearer picture of your health journey.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="how-it-works-step-custom">
                <div className="step-number-circle bg-primary-blue-teal-custom"> {/* Alternating colors */}
                  3
                </div>
                <div>
                  <h3 className="step-title">Share & Discuss</h3>
                  <p className="step-description">
                    Generate comprehensive reports from your data to share with your healthcare providers, facilitating more informed discussions and better care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action before Footer */}
        <section className="cta-section-custom">
          <div className="container-custom cta-content">
            <h2 className="cta-title">Ready to Take Control of Your Health Journey?</h2>
            <p className="cta-subtitle">
              Join RareJournal AI today and start tracking your symptoms with confidence.
            </p>
            <Link
              to="/signup"
              className="btn-primary-custom"
            >
              Sign Up Now - It's Free!
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-custom">
        <div className="container-custom">
          <div className="footer-content">
            <div className="text-sm">
              &copy; {new Date().getFullYear()} RareJournal AI. All rights reserved.
            </div>
            <div className="footer-links">
              <Link to="/privacy" className="footer-link-item">Privacy Policy</Link>
              <Link to="/terms" className="footer-link-item">Terms of Service</Link>
              <Link to="/contact" className="footer-link-item">Support</Link>
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
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="auth-page-container flex-col">
      <AuthCard title={`Welcome, ${user.name || user.email}! 👋`}>
        <p className="text-center-small mb-4" style={{ fontSize: '1.125rem' }}>This is your Dashboard.</p>
        <p className="text-center-small mb-6">
          You are logged in as: <span className="font-semibold"> {user.email}</span>
        </p>
        <div className="flex-col-space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" className="w-full btn-secondary-custom">
            Go to Home Page
            <ChevronRight size={20} className="ml-2" />
          </Link>
          <button
            onClick={logout}
            className="w-full btn-danger-custom"
          >
            <LogOut size={20} className="mr-2" />
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
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Placeholder routes for future pages */}
          <Route path="/features" element={<div className="auth-page-container"><AuthCard title="Features Page"><p className="text-center-small">This will be the Features page content.</p><Link to="/" className="link-custom mt-3">Go Home</Link></AuthCard></div>} />
          <Route path="/about" element={<div className="auth-page-container"><AuthCard title="About Us Page"><p className="text-center-small">This will be the About Us page content.</p><Link to="/" className="link-custom mt-3">Go Home</Link></AuthCard></div>} />
          <Route path="/contact" element={<div className="auth-page-container"><AuthCard title="Contact Page"><p className="text-center-small">This will be the Contact page content.</p><Link to="/" className="link-custom mt-3">Go Home</Link></AuthCard></div>} />
          <Route path="/forgot-password" element={<div className="auth-page-container"><AuthCard title="Forgot Password"><p className="text-center-small">Forgot Password functionality goes here.</p><Link to="/login" className="link-custom mt-3">Back to Login</Link></AuthCard></div>} />
          <Route path="/terms" element={<div className="auth-page-container"><AuthCard title="Terms of Service"><p className="text-center-small">Terms of Service content goes here.</p><Link to="/signup" className="link-custom mt-3">Back to Sign Up</Link></AuthCard></div>} />
          <Route path="/privacy" element={<div className="auth-page-container"><AuthCard title="Privacy Policy"><p className="text-center-small">Privacy Policy content goes here.</p><Link to="/signup" className="link-custom mt-3">Back to Sign Up</Link></AuthCard></div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
