import React, { useState, useEffect, useCallback } from "react";
import { createFile, updateFile, deleteFile, getFiles } from "src/lib/api";
import ConfirmationModal from "src/components/modals/ConfirmationModal/ConfirmationModal";
import { IoReloadCircleSharp } from "react-icons/io5";
import { toBase64 } from "src/services/Utils";
import { MdCheck, MdClose } from "react-icons/md";

const fileHeader = ["name", "file", "delete"];

export default function Files({ session }) {
  const [files, setFiles] = useState([]);
  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const loadFiles = useCallback(async () => {
    if (!session.token) return;
    try {
      const newFiles = await getFiles(session);
      setFiles(newFiles);
    } catch (error) {
      console.error(error);
      // TODO: display error message to user
    }
  }, [session]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleCreateFile = async (event) => {
    event.preventDefault();
    try {
      const formElements = event.target.elements;
      const name = formElements.namedItem("name").value;
      const file = formElements.namedItem("file").files[0];
      if (file && file.type !== "application/pdf") {
        return;
      }
      await createFile(session, {
        name,
        file: file ? await toBase64(file) : null,
      });
      loadFiles();
    } catch (error) {
      console.error(error);
      // TODO: display error message to user
    }
  };

  const handleUpdateFile = async (name, file) => {
    try {
      if (file.type !== "application/pdf") {
        // Reset the input if the selected file is not a PDF
        return;
      }
      await updateFile(session, { name, file: await toBase64(file) });
      loadFiles();
    } catch (error) {
      console.error(error);
      // TODO: display error message to user
    }
  };

  const handleConfirmDeleteFile = async () => {
    try {
      await deleteFile(session, selectedFile);
      loadFiles();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto pb-4 flex flex-col gap-8">
      <div>
        <form onSubmit={handleCreateFile}>
          <input
            className="p-1 border-2 rounded-md bg-transparent border-white mix-blend-difference 
          placeholder:text-white placeholder:text-opacity-50 outline-none"
            type="text"
            name="name"
            placeholder="File name"
            value={newFileName}
            onChange={(event) => setNewFileName(event.target.value)}
          />
          <input
            type="file"
            name="file"
            onChange={(event) => setNewFileContent(event.target.files[0])}
            className="p-2 border-2 rounded-md bg-transparent w-full mix-blend-difference text-white mt-2"
          />
          <button className="button px-4 py-2 bg-white text-black mix-blend-difference hover:bg-white hover:opacity-75 mt-2">
            Create File
          </button>
        </form>
      </div>
      <div className="w-fit min-w-full relative">
        <button
          className="absolute top-0 right-0 z-10 bg-transparent hover:opacity-75 text-primary-color m-1"
          onClick={loadFiles}
        >
          <IoReloadCircleSharp size="2rem" />
        </button>
        <table className="w-full border-collapse mix-blend-difference z-0">
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
                    {file.file ? (
                      <MdCheck size="1.2rem" />
                    ) : (
                      <MdClose size="1.2rem" />
                    )}
                    <input
                      type="file"
                      onChange={(event) =>
                        handleUpdateFile(file.name, event.target.files[0])
                      }
                    />
                  </td>
                  <td className="table__col">
                    <button
                      className="font-extrabold text-black h-full text-center py-1 px-2 m-0 cursor-pointer bg-white"
                      onClick={() => {
                        setSelectedFile(file);
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
      </div>

      {modalOpen && (
        <ConfirmationModal
          open={modalOpen}
          text={`Are you sure you want to delete the file ${selectedFile}?`}
          onConfirm={handleConfirmDeleteFile}
          onCancel={() => {
            setModalOpen(false);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
}
