import React, { useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { createKey, deleteKey, getKeys, updateKey } from 'src/lib/api';
import { IoReloadCircleSharp } from "react-icons/io5"
import ConfirmationModal from "src/components/modals/ConfirmationModal/ConfirmationModal";

function getDateAfterDays(days) {
  const today = new Date();
  const futureDate = new Date(today.setDate(today.getDate() + days));
  return futureDate;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Keys({ session }) {
  const [key, setKey] = useState("");
  const [expiresAt, setExpiresAt] = useState(getDateAfterDays(30));

  async function generateKey() {
    try {
      const resp = await createKey(session, { expires_at: expiresAt });
      setKey(resp.key.key);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="relative">
          <input
            type="text"
            value={`${window.location.origin}/registration?key=${key}`}
            readOnly
            className="p-2 border-2 rounded-md bg-transparent w-full mix-blend-difference text-white"
          />
          <button
            onClick={() => navigator.clipboard.writeText(key)}
            className="absolute button right-2 top-1/2 transform -translate-y-1/2 p-2 copy-button"
          >
            <FiCopy />
          </button>
        </div>
        <div className='flex flex-row gap-8 mt-2'>
          <button
            onClick={generateKey}
            className="button px-4 py-2 bg-white text-black mix-blend-difference hover:bg-white hover:opacity-75"
          >
            Generate Key
          </button>
          <input
            className='text-white bg-transparent date-icon cursor-pointer
 mix-blend-difference flex px-4 py-2 outline-none w-40'
            type="date"
            id="expiresAtInput"
            value={formatDate(expiresAt)}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>
      </div>
      {/* key table (with delete and expires_at change) */}
      <KeysTable session={session} />
    </div>
  );
}


const keyHeader = ["key", "expires_at", "delete"];

function KeysTable({ session }) {
  const [keys, setKeys] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  async function loadData() {
    if (!session.token) return;
    try {
      const resp = await getKeys(session);
      setKeys(resp);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [session.token]);

  const handleConfirmDeleteKey = async () => {
    try {
      await deleteKey(session, selectedKey);
      loadData();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmUpdateExpiresAt = async () => {
    try {
      await updateKey(session, selectedKey);
      loadData();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className='w-fit min-w-full relative'>
        <button
          className="absolute top-0 right-0 z-10 bg-transparent hover:opacity-75 text-primary-color m-1"
          onClick={loadData}
        >
          <IoReloadCircleSharp size="2rem" />
        </button>
        <table className="w-full mix-blend-difference">
          <thead>
            <tr className="w-full">
              {keyHeader.map((key) => (
                <th
                  key={key}
                  className="border pl-4 pr-12 py-2 text-left bg-white text-black font-black"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys
              .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
              .map((key, index) => (
                <tr key={index} className="">
                  <td className="table__col relative overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[40vw] pr-16">
                    {key.key}
                    <button
                      onClick={() => navigator.clipboard.writeText(key.key)}
                      className="absolute button right-2 top-1/2 transform -translate-y-1/2 copy-button p-2"
                    >
                      <FiCopy />
                    </button>
                  </td>
                  <td className="table__col">
                    <input
                      className='text-white bg-transparent date-icon cursor-pointer
                      mix-blend-difference flex px-4 py-2 outline-none w-40'
                      type='date'
                      value={formatDate(new Date(key.expires_at))}
                      onChange={(event) => {
                        setSelectedKey({ ...key, expires_at: event.target.value });
                        setModalOpen(true);
                        setModalType("update");                  
                      }}
                    />
                  </td>
                  <td className="table__col">
                    <button
                      className="font-extrabold text-black h-full text-center py-1 px-2 m-0 cursor-pointer bg-white"
                      onClick={() => {
                        setSelectedKey(key);
                        setModalOpen(true);
                        setModalType("delete");                  
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {modalOpen && modalType === "delete" && (
          <ConfirmationModal
            open={modalOpen}
            text="Are you sure you want to delete this key?"
            onConfirm={handleConfirmDeleteKey}
            onCancel={() => setModalOpen(false)}
          />
        )}
        {modalOpen && modalType === "update" && (
          <ConfirmationModal
            open={modalOpen}
            text="Are you sure you want to update this key?"
            onConfirm={handleConfirmUpdateExpiresAt}
            onCancel={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}