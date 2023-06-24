import { useState } from "react";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkedIcon = (
    <div className={"w-[28px] h-[28px] m-1 stroke-[10px]"}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-25 h-25'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    </div>
  );

  const btnClass =
    "border-[1.5px] border-solid mx-1 px-6 py-1 text-md rounded-3xl bg-transparent";

  return (
    <li
      htmlFor='list-item'
      className={
        "mx-3 my-2 rounded-xl shadow-md flex justify-between p-2 bg-slate-200/50"
      }
    >
      <div className={"flex items-center"}>
        {checkedIcon}
        <p className={"w-[300px] text-md"}>{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className={"flex items-center mx-2"}>
        <button
          className={`${btnClass} border-green-700 text-green-700 hover:bg-green-700 hover:text-white`}
          onClick={() => setShowModal(true)}
        >
          EDIT
        </button>
        <button
          className={`${btnClass} border-red-700 text-red-700 hover:bg-red-700 hover:text-white`}
          onClick={deleteItem}
        >
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
