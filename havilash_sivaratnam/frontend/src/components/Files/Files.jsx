import { useCallback, useEffect, useState } from "react";
import { IoReloadCircleSharp } from "react-icons/io5";
import { RxFile } from "react-icons/rx";
import ConfirmationPopup from "src/components/popups/ConfirmationPopup/ConfirmationPopup";
import { createFile, deleteFile, getFiles, updateFile } from "src/lib/api";
import { base64toObjectUrl, toBase64 } from "src/services/Utils";
import Popup from "../popups/Popup/Popup";

const fileHeader = ["name", "file", "delete"];

export default function Files({ session }) {
  const [newFile, setNewFile] = useState();
  const [error, setError] = useState();

  const handleCreateFile = async (event) => {
    event.preventDefault();
    if (!newFile.file) return;
    try {
      await createFile(session, {
        name: newFile.name,
        file: newFile.file ? await toBase64(newFile.file) : null,
      });
    } catch (error) {
      setError("Failed to create file.");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <form onSubmit={handleCreateFile}>
          <input
            className="p-1 border-2 rounded-md bg-transparent border-white mix-blend-difference 
          placeholder:text-white placeholder:text-opacity-50 outline-none transform-gpu"
            type="text"
            name="name"
            placeholder="File name"
            onChange={(event) =>
              setNewFile({ ...newFile, name: event.target.value })
            }
          />
          <input
            type="file"
            name="file"
            value={setNewFile.file}
            onChange={(event) =>
              setNewFile({ ...newFile, file: event.target.files[0] })
            }
            className="p-2 border-2 rounded-md bg-transparent w-full mix-blend-difference text-white mt-2 outline-none transform-gpu"
          />
          <button className="button px-4 py-2 bg-white text-black mix-blend-difference hover:bg-white hover:opacity-75 mt-2 transform-gpu">
            Create File
          </button>
        </form>
      </div>
      <FilesTable session={session} />
      {error && (
        <Popup open={true} onClose={() => setError(null)}>
          <p>{error}</p>
        </Popup>
      )}
    </div>
  );
}

function FilesTable({ session }) {
  const [files, setFiles] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState();

  const loadFiles = useCallback(async () => {
    if (!session.token) return;
    try {
      const newFiles = await getFiles(session);
      setFiles(newFiles);
    } catch (error) {
      setError("Failed to load file.");
    }
  }, [session]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleUpdateFile = async (name, file, event) => {
    try {
      await updateFile(session, {
        name,
        file: await toBase64(file),
      });
      loadFiles();
    } catch (error) {
      setError("Failed to get files");
    }
  };

  const handleConfirmDeleteFile = async () => {
    setPopupOpen(false);
    try {
      await deleteFile(session, selectedFile);
      loadFiles();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="w-fit min-w-full relative">
        <button
          className="absolute top-0 right-0 z-10 bg-transparent hover:opacity-75 text-primary-color m-1"
          onClick={loadFiles}
        >
          <IoReloadCircleSharp size="2rem" />
        </button>
        <table className="w-full border-collapse mix-blend-difference z-0 transform-gpu">
          <thead>
            <tr className="w-full">
              {fileHeader.map((key) => (
                <th
                  key={`header-${key}`}
                  className="border pl-4 pr-12 py-2 text-left bg-white text-black font-black"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {files
              .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
              .map((file) => (
                <tr key={`file-${file.name}`}>
                  <td className="table__col">{file.name}</td>
                  <td className="table__col flex flex-row gap-4 items-center">
                    <div className="w-4">
                      {file.file && (
                        <a
                          href={base64toObjectUrl(file.file)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <RxFile size="1.25rem" />
                        </a>
                      )}
                    </div>
                    <input
                      type="file"
                      onChange={(event) =>
                        handleUpdateFile(
                          file.name,
                          event.target.files[0],
                          event
                        )
                      }
                    />
                  </td>
                  <td className="table__col">
                    <button
                      className="font-extrabold text-black h-full text-center py-1 px-2 m-0 cursor-pointer bg-white"
                      onClick={() => {
                        setSelectedFile(file);
                        setPopupOpen(true);
                        setPopupType("delete");
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {popupOpen && popupType === "delete" && (
          <ConfirmationPopup
            open={popupOpen}
            text={`Are you sure you want to delete the file ${selectedFile.name}?`}
            onConfirm={handleConfirmDeleteFile}
            onCancel={() => {
              setPopupOpen(false);
              setSelectedFile(null);
            }}
          />
        )}
      </div>
      {error && (
        <Popup open={true} onClose={() => setError(null)}>
          <p>{error}</p>
        </Popup>
      )}
    </div>
  );
}
