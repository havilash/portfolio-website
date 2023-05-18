import React, { useCallback, useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "src/lib/api";
import Modal from "src/components/modals/Modal/Modal";
import ConfirmationModal from "src/components/modals/ConfirmationModal/ConfirmationModal";
import { IoReloadCircleSharp } from "react-icons/io5";

const userHeader = ["name", "email", "comment", "created_at", "access", "delete"];

export default function Users({ session }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const loadUsers = useCallback(async () => {
    if (!session.token) return;
    try {
      const newUsers = await getUsers(session);
      setUsers(newUsers);
    } catch (error) {
      console.error(error);
      // TODO: display error message to user
    }
  }, [session]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAccessChange = useCallback(
    (event, user) => {
      setSelectedUser({ ...user, access: event.target.value });
      setModalOpen(true);
      setModalType("access");
    },
    []
  );

  const handleConfirmAccessChange = useCallback(async () => {
    try {
      await updateUser(session, {
        id: selectedUser.id,
        access: selectedUser.access,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      // TODO: display error message to user
    }
  }, [selectedUser, session]);

  const handleDeleteUser = useCallback(
    async (user) => {
      try {
        await deleteUser(session, user);
        setUsers((prevUsers) =>
          prevUsers.filter((pUser) => pUser.id !== user.id)
        );
        setModalOpen(false);
      } catch (error) {
        console.error(error);
        // TODO: display error message to user
      }
    },
    [session]
  );

  return (
    <div className="overflow-x-auto pb-4">
      <div className="w-fit min-w-full relative">
        <button
          className="absolute top-0 right-0 z-10 bg-transparent hover:opacity-75 text-primary-color m-1"
          onClick={loadUsers}
        >
          <IoReloadCircleSharp size="2rem" />
        </button>
        <table className="w-full border-collapse mix-blend-difference z-0">
          <thead>
            <tr className="w-full">
              {userHeader.map((key) => (
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
            {users
              .sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
              )
              .map((user, index) => (
                <tr key={index} className="">
                  <td className="table__col">{user.name}</td>
                  <td className="table__col">{user.email}</td>
                  <td
                    className="table__col overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[10rem] cursor-pointer"
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedUser(user);
                      setModalType("comment");
                    }}
                  >
                    {user.comment}
                  </td>
                  <td className="table__col">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="table__col">
                    {user.id !== 1 ? (
                      <select
                        className="select py-1 px-2 rounded-none"
                        value={user.access}
                        onChange={(event) =>
                          handleAccessChange(event, user)
                        }
                      >
                        <option value={0}>Normal</option>
                        <option value={1}>Verified</option>
                        <option value={2}>Admin</option>
                      </select>
                    ) : (
                      "Admin"
                    )}
                  </td>
                  <td className="table__col">
                    {user.id !== 1 ? (
                      <button
                        className="font-extrabold text-black h-full text-center py-1 px-2 m-0 cursor-pointer bg-white"
                        onClick={() => {
                          setSelectedUser(user);
                          setModalOpen(true);
                          setModalType("delete");
                        }}
                      >
                        Delete
                      </button>
                    ) : (
                      "Delete"
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {modalOpen && modalType === "access" && (
          <ConfirmationModal
            open={modalOpen}
            text="Are you sure you want to change the access value for this user?"
            onConfirm={handleConfirmAccessChange}
            onCancel={() => setModalOpen(false)}
          />
        )}
        {modalOpen && modalType === "delete" && (
          <ConfirmationModal
            open={modalOpen}
            text="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(selectedUser)}
            onCancel={() => setModalOpen(false)}
          />
        )}
        {modalOpen && modalType === "comment" && (
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} className='max-w-xl'>
            <p>{selectedUser.comment}</p>
          </Modal>
        )}
      </div>
    </div>
  );
}
