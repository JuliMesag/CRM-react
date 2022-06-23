import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({cliente}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
         nombre: Yup.string()
                    .min(3, 'El Nombre es muy corto')
                    .max(40, 'El Nombre es muy largo')
                    .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
                    .required('El Nombre de la Empresa es Obligatorio'),
        email: Yup.string()
                    .email('E-mail no valido')
                    .required('El E-mail es Obligatorio'),
        telefono: Yup.number()
                    .positive('El Numero no es valido')
                    .integer('El Numero no es valido')
                    .typeError('El Numero no es valido'),
    })

    const handleSubmit = async (valores) => {
        try {
            let respuesta
            if(cliente.id){
                const url = `http://localhost:4000/clientes/${cliente.id}`

                    respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }else{
                // Nuevo Registro
                const url = 'http://localhost:4000/clientes'

                    respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await respuesta.json()
    
            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
    
        <Formik
            initialValues={{
                nombre: (cliente.nombre ? cliente.nombre : ""),
                empresa: (cliente.empresa ? cliente.empresa : ""),
                email: (cliente.email ? cliente.email : ""),
                telefono: (cliente.telefono ? cliente.telefono : ""),
                notas: (cliente.notas ? cliente.notas : "")
            }}
            enableReinitialize={true}
            onSubmit={ async (values, {resetForm}) => {
                await handleSubmit(values)

                resetForm()
            }}
            validationSchema={nuevoClienteSchema}
        >
            {({errors, touched}) => {
                return (
            <Form className='mt-5'>
                <div className='mb-4'>
                    <label htmlFor='nombre' className='text-gray-800'>Nombre:</label>
                    <Field name='nombre' id='nombre' type='text' className='mt-2 block w-full p-2 bg-gray-200 rounded-md' placeholder='Nombre del cliente'/>
                    
                    {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ) : null}
                </div>

                <div className='mb-4'>
                    <label htmlFor='empresa' className='text-gray-800'>Empresa:</label>
                    <Field name='empresa' id='empresa' type='text' className='mt-2 block w-full p-2 bg-gray-200 rounded-md' placeholder='Empresa del cliente'/>
                
                    {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                    ) : null}
                </div>

                <div className='mb-4'>
                    <label htmlFor='email' className='text-gray-800'>E-mail:</label>
                    <Field name='email' id='email' type='email' className='mt-2 block w-full p-2 bg-gray-200 rounded-md' placeholder='Email del cliente'/>
                
                    {errors.email && touched.email ? (
                        <Alerta>{errors.email}</Alerta>
                    ) : null}
                </div>

                <div className='mb-4'>
                    <label htmlFor='telefono' className='text-gray-800'>Telefono:</label>
                    <Field name='telefono' id='telefono' type='tel' className='mt-2 block w-full p-2 bg-gray-200 rounded-md' placeholder='Teléfono del cliente'/>
                        
                    {errors.telefono && touched.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                    ) : null}
                </div>

                <div className='mb-4'>
                    <label htmlFor='notas' className='text-gray-800'>Notas:</label>
                    <Field name='notas' as='textarea'  id='notas' type='text' className='mt-2 block w-full p-2 bg-gray-200 rounded-md h-20' placeholder='Notas del cliente'/>
                </div>

                <input type="submit" value={cliente.nombre ? 'Editar' : 'Agregar'} className='mt-5 w-full center-botton bg-blue-800 p-2 text-white font-medium text-xl rounded-sm' />
            </Form>
            )}}
        </Formik>
    </div>
  )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario