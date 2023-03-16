import React from 'react'

function Pagination({ page = 1, totalItems = null }) {
    return (
        <>
            {(Number(totalItems) > 0) &&
                <div className="text-center pt-3">
                    <nav className="d-flex justify-content-center">
                        <ul className="pagination pagination-lg custom-pagination mx-auto">
                            {page > 1 &&
                                <li className="page-item">
                                    <a className="page-link" href="#"><i className="fa-solid text-secondary fa-chevron-left" /></a>
                                </li>
                            }

                            <li className="page-item">
                                <a className="page-link" href="#">1</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">2</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#"><i className="fa-solid text-secondary fa-chevron-right" /></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            }
        </>
    )
}

export default Pagination