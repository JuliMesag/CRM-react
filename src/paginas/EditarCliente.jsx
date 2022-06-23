import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

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
        <h1 className='font-black text-3xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Actualiza los datos del cliente:</p>

        {cliente.nombre ? (
          <Formulario
            cliente={cliente}
          />
        ) : 'Usuario no encontrado'}
        
    </div>
  )
}

export default EditarCliente