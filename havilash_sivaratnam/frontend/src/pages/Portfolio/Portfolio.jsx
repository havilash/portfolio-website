import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { RxFile } from "react-icons/rx";

import { Link } from "react-router-dom";
import Popup from "src/components/popups/Popup/Popup";
import data from "src/data";
import { useRedirectToLogin } from "src/hooks/useSession";
import { base64toObjectUrl } from "src/services/Utils";
import "./Portfolio.css";
import { getFile } from "src/lib/api";

export default function Portfolio({ session }) {
  useRedirectToLogin(session, 1);
  const navigate = useNavigate();
  const [document, setDocument] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [allZip, setAllZip] = useState();

  async function loadFilesZip() {
    try {
      const newAll = await getFile(session, { name: "all.zip" });
      setAllZip(base64toObjectUrl(newAll.file, "application/zip"));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!session.token) return;
    loadFilesZip();
  }, [session.token]);

  function onButtonClick(item) {
    if (item.document) {
      navigate(`/portfolio/${item.document}`);
    } else if (item.documents) {
      setPopupOpen(true);
      setDocument(item);
    }
  }

  return (
    <section className="section w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <ul className="w-80 flex flex-col gap-4">
        <li className="self-center mb-2">
          <a
            href={allZip ? allZip : ""}
            className={`portfolio__button ${!allZip ? "disabled" : ""}`}
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
        <Popup
          className="md:px-4"
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
        >
          <div className="flex flex-col items-center gap-4 w-full max-h-[65vh] sm:max-h-[50vh]">
            <h2>{document && document.title}</h2>
            <ul className="portfolio__documents flex flex-col gap-2 w-full overflow-y-auto">
              {document &&
                document.documents.map((item, index) => (
                  <li
                    key={`document-${index}`}
                    className="flex flex-row gap-2 w-full px-12"
                  >
                    <Link
                      to={`/portfolio/${item.document}`}
                      className="portfolio__button-alt w-full whitespace-nowrap"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Popup>
      </ul>
    </section>
  );
}
