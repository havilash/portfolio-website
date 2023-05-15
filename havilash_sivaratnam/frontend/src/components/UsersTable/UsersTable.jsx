import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "src/lib/api";
import Modal from "src/components/Modal/Modal";
import useTrigger from "src/hooks/useTrigger";

const userHeader = ["name", "email", "comment", "created_at", "access", "delete"];

export default function UsersTable({ session }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [accessModalTrigger, accessModalTriggerFunc] = useTrigger();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalTrigger, deleteModalTriggerFunc] = useTrigger();
  const [userToDelete, setUserToDelete] = useState(null);
  const [commentModalTrigger, commentModalTriggerFunc] = useTrigger();
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!session.token) return;
      try {
        const newUsers = await getUsers(session);
        setUsers(newUsers);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [session.token]);

  const handleAccessChange = (event, user) => {
    setSelectedUser({ ...user, access: event.target.value });
    setAccessModalOpen(true);
    accessModalTriggerFunc();
  };

  const handleConfirmAccessChange = async () => {
    try {
      // Update the user's access value on the server
      await updateUser(session, { id: selectedUser.id, access: selectedUser.access });

      // Update the user's access value in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === selectedUser.id ? selectedUser : user))
      );
      setAccessModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      await deleteUser(session, user)
  
      setUsers((prevUsers) => prevUsers.filter((pUser) => pUser.id !== user.id));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <table className="w-full border-collapse mix-blend-difference">
        <thead>
          <tr className="w-full">
            {userHeader.map((key) => (
              <th
                key={key}
                className="border pl-4 pr-16 py-2 text-left bg-white text-black font-black"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((user, index) => (
              <tr key={index} className="">
                <td className="user-table__col">{user.name}</td>
                <td className="user-table__col">{user.email}</td>
                <td
                  className="user-table__col overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[10rem] cursor-pointer"
                  onClick={() => {
                    commentModalTriggerFunc();
                    setSelectedComment(user.comment);
                  }}>
                  {user.comment}
                </td>
                <td className="user-table__col">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="user-table__col">
                  {user.id !== 1 ? (
                    <select
                      className="select py-1 px-2 rounded-none"
                      value={user.access}
                      onChange={(event) => handleAccessChange(event, user)}>
                      <option value={0}>Normal</option>
                      <option value={1}>Verified</option>
                      <option value={2}>Admin</option>
                    </select>
                  ) : (
                    "Admin"
                  )}
                </td>
                <td className="user-table__col">
                  {user.id !== 1 ? (
                    <button
                      className="font-extrabold text-black h-full text-center py-1 px-2 m-0 cursor-pointer bg-white"
                      onClick={() => {
                        setUserToDelete(user);
                        setDeleteModalOpen(true);
                        deleteModalTriggerFunc();
                      }}>
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

      {accessModalOpen && (
        <Modal open={accessModalOpen} trigger={accessModalTrigger}>
          <div className="max-w-[12rem] flex flex-col gap-8 mix-blend-difference">
            <p>Are you sure you want to change the access value for this user?</p>
            <div className="flex flex-row justify-between items-center w-full">
              <button className="button rounded-md px-3 py-1" onClick={handleConfirmAccessChange}>Yes</button>
              <button className="button rounded-md px-3 py-1" onClick={() => setAccessModalOpen(false)}>No</button>
            </div>
          </div>
        </Modal>
      )}
      {deleteModalOpen && (
        <Modal open={deleteModalOpen} trigger={deleteModalTrigger}>
          <div className="max-w-[12rem] flex flex-col gap-8 mix-blend-difference">
            <p>Are you sure you want to delete this user?</p>
            <div className="flex flex-row justify-between items-center w-full">
              <button
                className="button rounded-md px-3 py-1"
                onClick={() => handleDeleteUser(userToDelete)}
              >
                Yes
              </button>
              <button
                className="button rounded-md px-3 py-1"
                onClick={() => setDeleteModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      { selectedComment &&
        <Modal trigger={commentModalTrigger}>
          <div className="max-w-[12rem] flex flex-col gap-8 mix-blend-difference">
            <p>{selectedComment}</p>
          </div>
        </Modal>
      }
    </div>
  );
}
