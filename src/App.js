import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { CourseList } from './components/courselist'
import {timeParts} from './utilities/times'
import {DatabaseValue} from './utilities/firebase.js';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);


const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  const response = await fetch(url);
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};


const Main = () =>  {
  //const { data:schedule, isLoading, error } = useQuery('schedule', fetchSchedule);
  const [schedule, isLoading, error] = DatabaseValue('schedule', addScheduleTimes);
  if (error) return <h1>{error}</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);
export default App;