//Función llamada hasConflict(curso, seleccionados) que pueda indicarnos si un curso tiene
//conflictos con un conjunto de cursos seleccionados.
//some() comprueba si al menos un elemento del array cumple con la condición implementada
//por la función proporcionada.
//La función courseConflict(curso1, curso2) debe devolver true si los cursos están en el mismo período 
//y se superponen en algún día y horario

export const hasConflict = (course, selected) => {
    return selected.some(selection => courseConflict(course, selection))
  };
  
  export const courseConflict = (course1, course2) => (
    getCourseTerm(course1) === getCourseTerm(course2)
    && timeConflict(course1, course2)
  );
  
  export const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};
  
  // obtenemos la primera letra del atributo id. Por ejemplo  "id": "F101", la letra es F que sería Fall
  export const getCourseTerm = course => (
    terms[course.id.charAt(0)]
  );
  
    
  //Los días se han separado y las horas de inicio y fin se han convertido en minutos desde la medianoche. 
  //La siguiente función realiza esto
  const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;
  
  export const timeParts = meets => {
    const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
    return !match ? {} : {
      days,
      hours: {
        start: hh1 * 60 + mm1 * 1,
        end: hh2 * 60 + mm2 * 1
      }
    };
  };
  
  const days = ['M', 'Tu', 'W', 'Th', 'F'];
  
  export const daysOverlap = (days1, days2) => { 
    return days.some(day => days1.includes(day) && days2.includes(day))
  };
  
  export const hoursOverlap = (hours1, hours2) => (
    Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
  );
  
  export const timeConflict = (course1, course2) => {
   return daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
  };
  
  export const addScheduleTimes = schedule => ({
    title: schedule.title,
    courses: mapValues(addCourseTimes, schedule.courses)
  });
  
  //Para evitar analizar constantemente las cadenas de horarios de las clases, 
  //agregaremos los nuevos campos a cada curso cuando se obtengan por primera vez, utilizando Object.fromEntries
  export const mapValues = (fn, obj) => (
    Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
  );
  
  export const addCourseTimes = course => ({
    ...course,
    ...timeParts(course.meets)
  });
  