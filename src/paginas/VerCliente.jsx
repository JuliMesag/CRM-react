import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const VerCliente = () => {

    const [cargando, setCargando] = useState(false)
    const [cliente, setCliente] = useState({})
    const { id } = useParams()

    useEffect(() => {
        setCargando(true)
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(false)
        }
        obtenerClienteAPI()

    }, [])

    return (

        <div>
            {cargando ? 'Cargando...' : (
                <>

                    <h1 className='font-black text-3xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                    <p className='mt-3'>Información del Cliente:</p>


                    <p className=' mt-8 text-lg text-gray-700'><span className=' text-xl font-bold'>Cliente: </span>{cliente.nombre}</p>
                    <p className=' mt-1 text-lg text-gray-700'><span className=' text-xl font-bold'>Email: </span>{cliente.email}</p>
                    {cliente.telefono ? (
                        <p className=' mt-1 text-lg text-gray-700'><span className=' text-xl font-bold'>Telefono: </span>{cliente.telefono}</p>
                    ) : null}

                    <p className=' mt-1 text-lg text-gray-700'><span className=' text-xl font-bold'>Empresa: </span>{cliente.empresa}</p>
                    {cliente.notas ? (
                        <p className=' mt-1 text-lg text-gray-700'><span className=' text-xl font-bold'>Notas: </span>{cliente.notas}</p>
                    ) : null}
                </>
            )}
        </div>
    )
}

export default VerCliente