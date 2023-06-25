import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { RxFile } from "react-icons/rx";

import { Link } from "react-router-dom";
import Modal from "src/components/modals/Modal/Modal";
import data from "src/data";
import { useRedirectToLogin } from "src/hooks/useSession";
import { getFilesZip } from "src/lib/api";
import { base64toObjectUrl } from "src/services/Utils";
import "./Portfolio.css";

export default function Portfolio({ session }) {
  useRedirectToLogin(session, 1);
  const [document, setDocument] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [filesZip, setFilesZip] = useState();

  async function loadFilesZip() {
    try {
      const newFilesZip = await getFilesZip(session);
      setFilesZip(newFilesZip.zip);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!session.token) return;
    loadFilesZip();
  }, [session.token]);

  function onButtonClick(item) {
    setModalOpen(true);
    setDocument(item);
  }

  return (
    <section className="section w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <ul className="w-80 flex flex-col gap-4">
        <li className="self-center mb-2">
          <a
            href={filesZip ? base64toObjectUrl(filesZip) : ""}
            className="portfolio__button"
            download="portfolio.zip"
          >
            <MdOutlineFileDownload className="portfolio__button__icon" />
          </a>
        </li>
        {data.portfolio.documents.map((item, index) => (
          <li key={`document-${index}`} className="flex flex-row gap-2">
            <button
              onClick={() => onButtonClick(item)}
              className="portfolio__button w-full"
            >
              {item.title}
              <RxFile className="portfolio__button__icon" />
            </button>
          </li>
        ))}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="flex flex-col items-center gap-4">
            <h2>{document && document.title}</h2>
            <ul className="flex flex-col gap-2 w-full">
              {document &&
                document.documents.map((item, index) => (
                  <li
                    key={`document-${index}`}
                    className="flex flex-row gap-2 w-full"
                  >
                    <Link
                      to={`/portfolio/${item.document}`}
                      className="portfolio__button-alt w-full"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Modal>
      </ul>
    </section>
  );
}
