import { hasConflict } from "../utilities/times";
import { useNavigate } from "react-router-dom";

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);
export const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

// obtenemos la primera letra del atributo id. Por ejemplo  "id": "F101", la letra es F que sería Fall
export const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

export const Course = ({ course, selected, setSelected }) => {
  const navigate = useNavigate();
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled ? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  return (
    <div className="card m-1 p-2"
      style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}
      onDoubleClick={() => navigate('/edit',{ state: course })}>
      <div className="card-body">
        <div className="card-title">{getCourseTerm(course)} CS {getCourseNumber(course)}</div>
        <div className="card-text">{course.title}</div>
        <div className="card-text">{course.meets}</div>
      </div>
    </div>
  );
};