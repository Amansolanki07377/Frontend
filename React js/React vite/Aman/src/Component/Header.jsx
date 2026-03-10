import React from 'react'


function Header() {
    return (
        <div>
            <div className="card">
                <img src="/images/cards/1.jpg" className="card-img-top" alt="green iguana" />
                <div className="card-body">
                    <h4>Lizard</h4>
                    <p className="card-text">
                        Lizards are a widespread group of squamate reptiles, with over
                        6,000 species, ranging across all continents except Antarctica.
                    </p>
                    <div>
                        <button className="btn btn-primary" type="button">Share</button>
                        <button className="btn btn-link" type="button">Learn More</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
