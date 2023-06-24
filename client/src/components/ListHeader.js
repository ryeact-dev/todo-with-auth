import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const removeCookie = useCookies(null)[2];
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("signout");
    removeCookie("Email");
    removeCookie("AuthToken");

    window.location.reload();
  };

  const btnClass =
    "px-6 py-2 text-sm font-bold rounded-xl border-[1.5px] border-solid bg-transparent";

  return (
    <div className='w-[800px] px-2 flex items-center justify-between border-b mb-2'>
      <h1 className='text-2xl font-bold'>{listName}</h1>
      <div className='my-3 flex gap-3 items-center'>
        <button
          className={`${btnClass} text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white`}
          onClick={() => setShowModal(true)}
        >
          ADD NEW
        </button>
        <button
          className={`${btnClass} text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-white`}
          onClick={signOut}
        >
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
