import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ComplaintList from './components/ComplaintList';
import ComplaintForm from './components/ComplaintForm';
import EditComplaint from './components/EditComplaint';

const App = () => {
  const location = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Premium Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 border-bottom border-secondary border-opacity-25 sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4">
            <span className="bg-primary bg-gradient p-2 rounded-3 d-inline-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-shield-fill-check text-white"></i>
            </span>
            <span className="text-white tracking-wide">Resolvify</span>
            <span className="badge bg-primary fs-7 px-2 py-1 ms-1 text-uppercase fw-semibold" style={{ fontSize: '0.65rem' }}>CMS</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-2 mt-3 mt-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link px-3 rounded-pill d-flex align-items-center gap-2 fw-semibold ${
                    location.pathname === '/' ? 'active bg-primary text-white' : 'text-secondary-emphasis'
                  }`}
                >
                  <i className="bi bi-grid-1x2-fill"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/add"
                  className={`nav-link px-3 rounded-pill d-flex align-items-center gap-2 fw-semibold ${
                    location.pathname === '/add' ? 'active bg-primary text-white' : 'text-secondary-emphasis'
                  }`}
                >
                  <i className="bi bi-plus-circle-fill"></i>
                  File Complaint
                </Link>
              </li>
              <li className="nav-item ms-lg-2">
                <div className="d-flex align-items-center gap-2 text-white bg-secondary bg-opacity-25 py-1 px-3 rounded-pill">
                  <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                  <span className="small text-white-50">API Connected</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<ComplaintList />} />
          <Route path="/add" element={<ComplaintForm />} />
          <Route path="/edit/:id" element={<EditComplaint />} />
        </Routes>
      </main>

      {/* Modern Footer */}
      <footer className="bg-dark text-white py-4 mt-auto border-top border-secondary border-opacity-10">
        <div className="container">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-md-6 text-center text-md-start">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
                <i className="bi bi-shield-fill-check text-primary fs-5"></i>
                <span className="fw-bold fs-5">Resolvify</span>
              </div>
              <p className="mb-0 text-white-50 small">
                &copy; {new Date().getFullYear()} Resolvify Inc. All rights reserved. Professional Complaint Management System.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="text-white-50 small me-3">Built with React, Redux Toolkit & Bootstrap</span>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white-50 hover-white">
                <i className="bi bi-github fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
