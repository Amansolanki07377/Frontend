import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setStatusFilter } from '../features/complaints/complaintSlice';

const SearchProducts = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.complaints.searchQuery);
  const statusFilter = useSelector((state) => state.complaints.statusFilter);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleStatusChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(setSearchQuery(''));
    dispatch(setStatusFilter(''));
  };

  return (
    <div className="card border-0 shadow-sm mb-4 bg-white rounded-3">
      <div className="card-body p-4">
        <h5 className="card-title mb-3 fw-bold text-secondary">
          <i className="bi bi-funnel-fill me-2 text-primary"></i>Search & Filter
        </h5>
        <div className="row g-3 align-items-end">
          {/* Customer Name Search */}
          <div className="col-md-6 col-lg-5">
            <label htmlFor="searchCustomer" className="form-label fw-semibold text-muted small">
              Search by Customer Name
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                id="searchCustomer"
                className="form-control bg-light border-start-0 ps-0"
                placeholder="Enter customer name..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-md-4 col-lg-4">
            <label htmlFor="statusFilter" className="form-label fw-semibold text-muted small">
              Filter by Status
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-filter-circle text-muted"></i>
              </span>
              <select
                id="statusFilter"
                className="form-select bg-light border-start-0 ps-0"
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="col-md-2 col-lg-3 d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
              onClick={handleClearFilters}
              disabled={!searchQuery && !statusFilter}
              style={{ transition: 'all 0.2s' }}
            >
              <i className="bi bi-x-circle"></i>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
