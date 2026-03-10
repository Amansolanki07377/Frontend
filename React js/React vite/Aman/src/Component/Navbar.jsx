import React from 'react'

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarExample" aria-controls="navbarExample" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <NavLink className="navbar-brand" to="/"><img src="/images/bootstrap-logo.svg" width={36} /></NavLink>
                    <div className="collapse navbar-collapse" id="navbarExample">
                        <ul className="navbar-nav me-auto mb-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/team">Team</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="/projects" role="button" data-bs-toggle="dropdown" aria-expanded="false">Projects</NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/projects/action">Action</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/projects/another">Another action</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink className="dropdown-item" to="/projects/other">Something else here</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center flex-column flex-lg-row">
                            <form className="me-2 mb-2 mb-lg-0">
                                <input type="text" className="form-control form-control-sm" placeholder="Search" />
                            </form>
                            <NavLink className="btn btn-primary" to="/signup">Sign up</NavLink>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
