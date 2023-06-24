import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const cookies = useCookies(null)[0];
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("WORKED");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <section
      htmlFor='overlay'
      className='absolute top-0 left-0 w-screen h-screen bg-gray-500/50 flex justify-center items-center'
    >
      <div
        htmlFor='modal'
        className='w-[500px] bg-white p-10 rounded-xl shadow-lg'
      >
        <div className='flex justify-between'>
          <h3>Let's create your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form className='flex flex-col'>
          <input
            required
            maxLength={30}
            placeholder='Your task goes here'
            name='title'
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor='range'>Drag to select your current progress</label>
          <input
            required
            type='range'
            id='range'
            min='0'
            max='100'
            name='progress'
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className='px-3 py-4 rounded-xl border-[1.5px] border-solid border-blue-700 text-blue-700 hover:text-white hover:cursor-pointer hover:bg-blue-700'
            type='submit'
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </section>
  );
};

export default Modal;
