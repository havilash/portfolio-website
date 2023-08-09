import { useCallback, useEffect, useState } from "react";
import { IoReloadCircleSharp } from "react-icons/io5";
import ConfirmationPopup from "src/components/popups/ConfirmationPopup/ConfirmationPopup";
import Popup from "src/components/popups/Popup/Popup";
import { deleteUser, getUsers, updateUser } from "src/lib/api";

const userHeader = [
  "name",
  "email",
  "comment",
  "created_at",
  "access",
  "delete",
];

export default function Users({ session }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    if (!session.token) return;
    try {
      const newUsers = await getUsers(session);
      setUsers(newUsers);
    } catch (error) {
      setError("Failed to get users");
    }
  }, [session]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAccessChange = useCallback((event, user) => {
    setSelectedUser({ ...user, access: event.target.value });
    setPopupOpen(true);
    setPopupType("access");
  }, []);

  const handleConfirmAccessChange = useCallback(async () => {
    setPopupOpen(false);
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
    } catch (error) {
      setError("Failed to update user access.");
    }
  }, [selectedUser, session]);

  const handleDeleteUser = useCallback(
    async (user) => {
      setPopupOpen(false);
      try {
        await deleteUser(session, user);
        setUsers((prevUsers) =>
          prevUsers.filter((pUser) => pUser.id !== user.id)
        );
      } catch (error) {
        setError("Failed to delete user.");
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
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((user, index) => (
                <tr key={index} className="">
                  <td className="table__col">{user.name}</td>
                  <td className="table__col">{user.email}</td>
                  <td
                    className="table__col overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[10rem] cursor-pointer"
                    onClick={() => {
                      setPopupOpen(true);
                      setSelectedUser(user);
                      setPopupType("comment");
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
                        onChange={(event) => handleAccessChange(event, user)}
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
                          setPopupOpen(true);
                          setPopupType("delete");
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

        {popupOpen && popupType === "access" && (
          <ConfirmationPopup
            open={popupOpen}
            text="Are you sure you want to change the access value for this user?"
            onConfirm={handleConfirmAccessChange}
            onCancel={() => setPopupOpen(false)}
          />
        )}
        {popupOpen && popupType === "delete" && (
          <ConfirmationPopup
            open={popupOpen}
            text="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(selectedUser)}
            onCancel={() => setPopupOpen(false)}
          />
        )}
        {popupOpen &&
          popupType === "comment" &&
          selectedUser.comment !== null && (
            <Popup
              open={popupOpen}
              onClose={() => setPopupOpen(false)}
              className="max-w-xl"
            >
              <p className="break-all hyphens-auto">{selectedUser.comment}</p>
            </Popup>
          )}
        {error && (
          <Popup open={true} onClose={() => setError(null)}>
            <p>{error}</p>
          </Popup>
        )}
      </div>
    </div>
  );
}
