import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addComplaint } from '../features/complaints/complaintSlice';

const ComplaintForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.complaints);

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    description: '',
    status: 'Pending',
    date: getTodayDate(),
  });

  const [validated, setValidated] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'phone') {
      if (value.length > 0 && !/^\d{10}$/.test(value)) {
        setPhoneError('Phone number must be exactly 10 digits.');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validate standard HTML5 fields
    if (form.checkValidity() === false || phoneError) {
      e.stopPropagation();
      setValidated(true);
      if (!/^\d{10}$/.test(formData.phone)) {
        setPhoneError('Phone number must be exactly 10 digits.');
      }
      return;
    }

    // Dispatch add complaint thunk
    dispatch(addComplaint(formData))
      .unwrap()
      .then(() => {
        // Redirect to dashboard on success
        navigate('/');
      })
      .catch((err) => {
        console.error('Failed to submit complaint:', err);
      });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                File Complaint
              </li>
            </ol>
          </nav>

          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Form Header */}
            <div className="bg-primary bg-gradient text-white p-4 d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                <i className="bi bi-file-earmark-plus-fill fs-3"></i>
              </div>
              <div>
                <h4 className="mb-0 fw-bold">Register New Complaint</h4>
                <p className="mb-0 text-white-50 small">Fill in all fields to log customer grievance</p>
              </div>
            </div>

            {/* Form Body */}
            <div className="card-body p-4 bg-light bg-opacity-50">
              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className={`needs-validation ${validated ? 'was-validated' : ''}`}>
                <h5 className="border-bottom pb-2 mb-3 text-secondary fw-bold small text-uppercase tracking-wider">
                  <i className="bi bi-person-fill me-2"></i>Customer Details
                </h5>

                <div className="row g-3 mb-4">
                  {/* Customer Name */}
                  <div className="col-md-6">
                    <label htmlFor="customerName" className="form-label fw-semibold text-muted small">
                      Customer Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      id="customerName"
                      name="customerName"
                      placeholder="Enter full name"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter customer name.</div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold text-muted small">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control border-0 shadow-sm"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter a valid email address.</div>
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label fw-semibold text-muted small">
                      Phone Number (10 digits) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className={`form-control border-0 shadow-sm ${phoneError && validated ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {phoneError ? (
                      <div className="text-danger small mt-1">{phoneError}</div>
                    ) : (
                      <div className="invalid-feedback">Please enter phone number.</div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label fw-semibold text-muted small">
                      Complaint Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control border-0 shadow-sm"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please select a valid date.</div>
                  </div>

                  {/* Address */}
                  <div className="col-12">
                    <label htmlFor="address" className="form-label fw-semibold text-muted small">
                      Billing / Contact Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      id="address"
                      name="address"
                      placeholder="Enter street, apartment, city, state"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter customer address.</div>
                  </div>
                </div>

                <h5 className="border-bottom pb-2 mb-3 text-secondary fw-bold small text-uppercase tracking-wider">
                  <i className="bi bi-file-earmark-text-fill me-2"></i>Complaint Details
                </h5>

                <div className="row g-3 mb-4">
                  {/* Complaint Title */}
                  <div className="col-md-8">
                    <label htmlFor="title" className="form-label fw-semibold text-muted small">
                      Complaint Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      id="title"
                      name="title"
                      placeholder="Summary of the issue"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter a complaint title.</div>
                  </div>

                  {/* Status */}
                  <div className="col-md-4">
                    <label htmlFor="status" className="form-label fw-semibold text-muted small">
                      Initial Status
                    </label>
                    <select
                      className="form-select border-0 shadow-sm"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  {/* Complaint Description */}
                  <div className="col-12">
                    <label htmlFor="description" className="form-label fw-semibold text-muted small">
                      Detailed Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control border-0 shadow-sm"
                      id="description"
                      name="description"
                      rows="4"
                      placeholder="Describe the complaint in detail..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <div className="invalid-feedback">Please enter complaint description.</div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="d-flex justify-content-end gap-3 mt-4">
                  <Link to="/" className="btn btn-light border px-4 py-2 rounded-3">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 rounded-3 d-flex align-items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle-fill"></i>
                        Submit Complaint
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
