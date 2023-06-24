import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const cookies = useCookies(null)[0];
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  //Sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <>
      {!authToken && <Auth />}
      {authToken && (
        <div className='p-2 rounded-lg bg-slate-100'>
          <ListHeader listName={"🏝️ Weekly ToDo List"} getData={getData} />
          <p className='flex item-center justify-end px-2'>
            Welcome back &nbsp; <span className='font-bold'>{userEmail}</span>
          </p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
