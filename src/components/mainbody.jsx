import React from 'react'
import './mainbody.css'
import Cards from './cards'

const mainbody = () => {
    return (
        <div className='product-body' >
            <span className='title' >Fresh Recomendations</span>
            <div className='cards' >
                <Cards />
            </div>

        </div>
    )
}

export default mainbody