import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router";

import SkeletonFile from "src/components/skeletons/SkeletonFile/SkeletonFile";
import { useRedirectToLogin } from "src/hooks/useSession";
import { getFile } from "src/lib/api";
import { toUint8Array } from "src/services/Utils";
import "./Document.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PortfolioDocument({ session }) {
  useRedirectToLogin(session, 1);
  const navigate = useNavigate();
  const { ["document"]: documentName } = useParams();
  const [document, setDocument] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  function handleResize() {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }

  useEffect(() => {
    async function loadDocument() {
      if (!session.user) return;
      try {
        const data = await getFile(session, { name: documentName });
        const fileContent = data.file;
        if (!fileContent) return navigate("/portfolio");
        const binaryData = atob(fileContent); // to binary
        const byteArray = toUint8Array(binaryData);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        setDocument(URL.createObjectURL(blob));
      } catch (error) {
        console.error(error);
        navigate("/portfolio");
      }
    }

    if (documentName) {
      loadDocument();
    } else {
      navigate("/portfolio");
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [session.ready]);

  useEffect(() => {
    if (!containerRef.current) return;
    handleResize();
  }, [containerRef.current]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <section className="section pt-16 sm:p-24 lg:p-48 2xl:px-80 min-h-screen">
      <div className="document__data">
        <div className="flex flex-row items-center gap-4">
          <a href={document} download={documentName}>
            <MdOutlineFileDownload className="document__data__download" />
          </a>
          <h2 className="text-white mix-blend-difference text-[5vw] xs:text-2xl">
            {documentName}
          </h2>
        </div>
      </div>
      <div ref={containerRef} className="document relative">
        {isLoading && <SkeletonFile />}
        {
          <Document
            file={document}
            onLoadSuccess={onDocumentLoadSuccess}
            loading=""
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                className="shadow-lg mb-4"
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading=""
              />
            ))}
          </Document>
        }
      </div>
    </section>
  );
}
