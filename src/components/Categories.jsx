import React from 'react'
import './Categories.css'

const Categories = () => {
    return (
        <div className='categories' >

            <div className="all">
                  <span>All Categories</span>
            </div>
            <div className="cate">
                <ul>
                    <li>Cars</li>
                    <li>Motorcycles</li>
                    <li>Mobile Phones</li>
                    <li>For Sale : Houses & Apartments</li>
                    <li>Comercial & Other Vehicles</li>
                    <li>For Rent : Houses & Apartments</li>
                </ul>
            </div>


        </div>
    )
}

export default Categories