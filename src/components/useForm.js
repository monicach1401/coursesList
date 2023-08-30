// el hook useForm de react-hook-form devuelve dos valores: errors y handleSubmit.
// ERRORS: Es un objeto que contiene los nombres de los campos y los resultados de validación. 
// Si el valor del campo es una cadena vacía (""), significa que el campo es válido. 
// Si el valor es una cadena no vacía, contiene un mensaje de error amigable que debería ser mostrado 
// al usuario en caso de que haya errores en el campo.
// HANDLESUBMIT: Es una función que debe ser llamada cuando se envía el formulario.
// Esta función solo llamará a la función de envío (por ejemplo, para guardar los datos en Firebase) 
// si la función de validación (validate) no devuelve errores, es decir, si no hay mensajes de error
// en el objeto errors.
// useForm se le pasa dos funciones definidas por el desarrollador: validate y submit.
// VALIDATE: Será llamada para validar cada campo del formulario. 
// Debe devolver el mensaje de error si hay algún problema o una cadena vacía ("") si el campo es válido.
// SUBMIT: Solo se llamará si no hay errores en el formulario. 
// Recibirá un objeto con los datos del formulario que se pueden utilizar para realizar la acción de envío 
// (por ejemplo, guardar los datos en Firebase).
import { useState } from 'react';


  export const useForm = (validate, submit) => {
    const [errors, setErrors] = useState(null);
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      const form = evt.target;
      const entries = Array.from(new FormData(form).entries());
      const errors = entries.map(([key, val]) => [key, validate(key, val)]);
      errors.forEach(([key, val]) => { form[key].setCustomValidity(val) });
  
      if (errors.some(([key, val]) => val !== '')) {
        setErrors(Object.fromEntries(errors));
      } else {
        setErrors(null);
        submit(Object.fromEntries(entries));
      }
    }
  
    return [errors, handleSubmit];
  }