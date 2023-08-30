
import { useLocation } from "react-router-dom";
import { useForm } from './useForm';
import { timeParts } from "../utilities/times";
import { setData } from "../utilities/firebase.js";

// Para obtener estos datos en EditForm, importamos y utilizamos el hook useLocation().
// Cambiamos EditForm para importar useLocation, lo usamos para obtener el curso y utilizamos los datos 
// del curso para proporcionar valores predeterminados en los campos del formulario. 
// Agregamos el ID del curso como un campo oculto para que esté disponible cuando se envíe el formulario, 
// pero no sea editable por el usuario.
// HAciendo doble-click en un curso en EditForm debe aparecer los datos del curso



const isValidMeets = (meets) => {
  const parts = timeParts(meets);
  return (meets === '' || (parts.days && !isNaN(parts.hours?.start) && !isNaN(parts.hours?.end)));
};

const validateCourseData = (key, val) => {
  switch (key) {
    case 'title': return /(^$|\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets': return isValidMeets(val) ? '' : 'must be days hh:mm-hh:mm';
    default: return '';
  }
};


// como esta acción es permanente, debemos confirmar con el usuario
// antes de guardar los datos permanentemente utilizando window.confirm().
// Hacemos que la función submit sea async para poder utilizar await con setData() 
// y esperar a que se complete la operación antes de mostrar la alerta.
const submit = async (values) => {
  if (window.confirm(`Change ${values.id} to ${values.title}: ${values.meets}`)) {
    try {
      await setData(`schedule/courses/${values.id}/`, values);
    } catch (error) {
      alert(error);
    }
  }
};

const EditForm = () => {
  const { state: course } = useLocation();
  const [ errors, handleSubmit ] = useForm(validateCourseData, submit);
  return (
    <form onSubmit={handleSubmit} noValidate className={errors ? 'was-validated' : null}>
        <input type="hidden" name="id" value={course.id} />
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Course title</label>
        <input className="form-control" id="title" name="title" defaultValue={course.title} />
        <div className="invalid-feedback">{errors?.title}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting time</label>
        <input className="form-control" id="meets" name="meets" defaultValue={course.meets} />
        <div className="invalid-feedback">{errors?.meets}</div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
};

export default EditForm;


