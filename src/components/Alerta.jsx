import React from 'react'

const Alerta = ({children}) => {
    return (
        <div className='text-center  bg-red-500 text-white font-light p-2 text-lg rounded-sm'>
            {children}
        </div>
    )
}

export default Alerta