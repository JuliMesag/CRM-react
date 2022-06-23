import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar }) => {

    const navigate = useNavigate()

    const { nombre, empresa, email, telefono, notas, id } = cliente

    return (
        <tr className='border-b hover:bg-gray-200'>
            <td className='p-2'>{nombre}</td>
            <td className='p-2'>
                <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
                <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{telefono}</p>
            </td>
            <td className='p-2'>{empresa}</td>
            <td className='p-2'>

                <button className='bg-gray-500 hover:bg-gray-600 block w-full text-white p-2 text-base rounded-sm' 
                        type="button"
                        onClick={() => navigate(`/clientes/${id}`)}>
                    Ver
                </button>

                <button className=' mt-1 bg-blue-500 hover:bg-blue-600 block w-full text-white p-2 text-base rounded-sm' 
                        type="button" 
                        onClick={() => navigate(`/clientes/editar/${id}`)}>
                    Editar
                </button>

                <button className='mt-1 bg-red-400 hover:bg-red-500 block w-full text-white p-2  text-base rounded-sm' 
                        type="button"
                        onClick={() => handleEliminar(id)}>
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Cliente
