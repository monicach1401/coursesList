import { useState } from 'react';
import { getCourseTerm, terms } from './course';
import { Course } from './course';
import { signInWithGoogle , signOut } from '../utilities/firebase.js';
import { useUserState } from '../utilities/firebase.js';

const SignInButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signInWithGoogle()}>
        Sign In
    </button>
);

const SignOutButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signOut()}>
      Sign Out
    </button>
  );

const TermSelector = ({term, setTerm}) => {
  const [user] = useUserState();
  return (
    <div className="btn-toolbar justify-content-between">
      <div className="btn-group">
      { 
        Object.values(terms).map(
          value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
        )
      }
      </div>
      { user ? <SignOutButton /> : <SignInButton /> }
    </div>
  );
};

const TermButton = ({ term, setTerm, checked }) => (
    <>
        <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
            onChange={() => setTerm(term)} />
        <label class="btn btn-success m-1 p-2" htmlFor={term}>
            {term}
        </label>
    </>
);
export const CourseList = ({ courses }) => {
    console.log('estoy en courselist y courses es:', courses)
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);

    if (selected.some(course => course !== courses[course.id])) {
        setSelected([])
    };
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));

    return (
        <>
            <TermSelector term={term} setTerm={setTerm} />
            <div className="course-list">
                {
                    termCourses.map(course =>
                        <Course key={course.id} course={course}
                            selected={selected} setSelected={setSelected}
                        />)
                }
            </div>
        </>
    );
};


