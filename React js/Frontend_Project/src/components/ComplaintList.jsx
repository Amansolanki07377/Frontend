import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComplaints, deleteComplaint } from '../features/complaints/complaintSlice';
import SearchProducts from './SearchProducts';

const ComplaintList = () => {
  const dispatch = useDispatch();
  const { complaints, loading, error, searchQuery, statusFilter } = useSelector(
    (state) => state.complaints
  );

  // State for deletion modal confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [selectedComplaintName, setSelectedComplaintName] = useState('');

  // Fetch complaints on load
  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  // Statistics calculation
  const totalStats = complaints.length;
  const pendingStats = complaints.filter((c) => c.status === 'Pending').length;
  const inProgressStats = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedStats = complaints.filter((c) => c.status === 'Resolved').length;

  // Filter complaints list based on Redux filter state
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = complaint.customerName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === '' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (id, name) => {
    setSelectedComplaintId(id);
    setSelectedComplaintName(name);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedComplaintId) {
      dispatch(deleteComplaint(selectedComplaintId))
        .unwrap()
        .then(() => {
          setShowDeleteModal(false);
          setSelectedComplaintId(null);
          setSelectedComplaintName('');
        })
        .catch((err) => {
          console.error('Delete failed:', err);
        });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedComplaintId(null);
    setSelectedComplaintName('');
  };

  return (
    <div className="container py-4">
      {/* Dashboard Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Complaint Center</h2>
          <p className="text-muted mb-0">Manage customer issues, track status, and resolve grievances.</p>
        </div>
        <Link
          to="/add"
          className="btn btn-primary btn-lg d-flex align-items-center gap-2 shadow-sm rounded-3 px-4 py-2"
          style={{ transition: 'all 0.2s' }}
        >
          <i className="bi bi-plus-lg fs-5"></i>
          <span>File Complaint</span>
        </Link>
      </div>

      {/* Dynamic Statistics Cards */}
      <div className="row g-3 mb-4">
        {/* Total Complaints */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="card-subtitle mb-2 text-muted fw-semibold small text-uppercase">Total Tickets</h6>
                <h3 className="card-title mb-0 fw-bold text-dark">{totalStats}</h3>
              </div>
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                <i className="bi bi-ticket-detailed-fill fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Complaints */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="card-subtitle mb-2 text-muted fw-semibold small text-uppercase">Pending</h6>
                <h3 className="card-title mb-0 fw-bold text-danger">{pendingStats}</h3>
              </div>
              <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                <i className="bi bi-clock-history fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress Complaints */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="card-subtitle mb-2 text-muted fw-semibold small text-uppercase">In Progress</h6>
                <h3 className="card-title mb-0 fw-bold text-warning">{inProgressStats}</h3>
              </div>
              <div className="bg-warning bg-opacity-10 text-warning-emphasis p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                <i className="bi bi-arrow-repeat fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Resolved Complaints */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="card-subtitle mb-2 text-muted fw-semibold small text-uppercase">Resolved</h6>
                <h3 className="card-title mb-0 fw-bold text-success">{resolvedStats}</h3>
              </div>
              <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px' }}>
                <i className="bi bi-check-circle-fill fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchProducts />

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill fs-5"></i>
          <div className="flex-grow-1">{error}</div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm ms-auto"
            onClick={() => dispatch(fetchComplaints())}
          >
            Retry
          </button>
        </div>
      )}

      {/* Table Card */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white mb-5">
        <div className="card-body p-0">
          {loading && complaints.length === 0 ? (
            /* Loading State */
            <div className="p-5 text-center">
              <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mb-0">Fetching complaints database...</p>
            </div>
          ) : filteredComplaints.length === 0 ? (
            /* No Records Found State */
            <div className="p-5 text-center bg-light bg-opacity-50">
              <div className="mb-3">
                <i className="bi bi-journal-x text-muted" style={{ fontSize: '4.5rem' }}></i>
              </div>
              <h4 className="fw-bold text-secondary">No Records Found</h4>
              <p className="text-muted mx-auto" style={{ maxWidth: '400px' }}>
                We couldn't find any complaints matching your search parameters or there are no tickets in the database yet.
              </p>
              {searchQuery || statusFilter ? (
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="btn btn-outline-primary btn-sm px-4 rounded-pill"
                >
                  Reload Page
                </button>
              ) : (
                <Link to="/add" className="btn btn-primary btn-sm px-4 rounded-pill">
                  File First Complaint
                </Link>
              )}
            </div>
          ) : (
            /* Responsive Table */
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary small fw-bold">
                  <tr>
                    <th className="py-3 ps-4" style={{ width: '90px' }}>ID</th>
                    <th className="py-3">Customer details</th>
                    <th className="py-3">Complaint Details</th>
                    <th className="py-3" style={{ width: '120px' }}>Date</th>
                    <th className="py-3" style={{ width: '130px' }}>Status</th>
                    <th className="py-3 text-center" style={{ width: '140px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((complaint) => {
                    // Decide status badge styling
                    let badgeClass = 'bg-danger-subtle text-danger';
                    if (complaint.status === 'In Progress') {
                      badgeClass = 'bg-warning-subtle text-warning-emphasis';
                    } else if (complaint.status === 'Resolved') {
                      badgeClass = 'bg-success-subtle text-success';
                    }

                    return (
                      <tr key={complaint.id} style={{ transition: 'background-color 0.2s' }}>
                        <td className="ps-4 text-muted small fw-bold">#{complaint.id}</td>
                        <td>
                          <div className="fw-bold text-dark">{complaint.customerName}</div>
                          <div className="text-muted small d-flex flex-column">
                            <span><i className="bi bi-envelope me-1"></i>{complaint.email}</span>
                            <span><i className="bi bi-telephone me-1"></i>{complaint.phone}</span>
                          </div>
                        </td>
                        <td>
                          <div className="fw-semibold text-dark mb-1">{complaint.title}</div>
                          <p className="text-muted small mb-0 text-truncate" style={{ maxWidth: '280px' }} title={complaint.description}>
                            {complaint.description}
                          </p>
                          <small className="text-black-50 d-block mt-1">
                            <i className="bi bi-geo-alt me-1"></i>{complaint.address}
                          </small>
                        </td>
                        <td className="text-muted small">{complaint.date}</td>
                        <td>
                          <span className={`badge px-3 py-2 rounded-pill fw-semibold ${badgeClass}`}>
                            <i className={`bi bi-circle-fill me-1 small ${
                              complaint.status === 'Pending' ? 'text-danger' :
                              complaint.status === 'In Progress' ? 'text-warning' : 'text-success'
                            }`}></i>
                            {complaint.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              to={`/edit/${complaint.id}`}
                              className="btn btn-outline-warning btn-sm d-flex align-items-center justify-content-center p-2 rounded-3"
                              title="Edit Complaint"
                              style={{ width: '34px', height: '34px' }}
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center p-2 rounded-3"
                              title="Delete Complaint"
                              onClick={() => handleDeleteClick(complaint.id, complaint.customerName)}
                              style={{ width: '34px', height: '34px' }}
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* State Managed Deletion Confirmation Modal */}
      {showDeleteModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-0 bg-danger bg-gradient text-white p-4">
                  <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                    <i className="bi bi-exclamation-octagon-fill"></i>
                    Confirm Deletion
                  </h5>
                  <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleCancelDelete}></button>
                </div>
                <div className="modal-body p-4">
                  <p className="mb-1">Are you sure you want to permanently delete the complaint filed by:</p>
                  <strong className="text-dark fs-5 d-block mb-3">{selectedComplaintName}</strong>
                  <p className="text-muted small mb-0">
                    <i className="bi bi-info-circle me-1"></i>
                    This action cannot be undone. All ticket details will be removed from the server database.
                  </p>
                </div>
                <div className="modal-footer border-0 p-3 bg-light bg-opacity-75">
                  <button type="button" className="btn btn-light px-4 rounded-3 border" onClick={handleCancelDelete}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger px-4 rounded-3 d-flex align-items-center gap-2" onClick={handleConfirmDelete}>
                    <i className="bi bi-trash3-fill"></i>
                    Delete Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default ComplaintList;
