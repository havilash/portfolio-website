import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router";

import SkeletonFile from "src/components/skeletons/SkeletonFile/SkeletonFile";
import { useRedirectToLogin } from "src/hooks/useSession";
import { getFile } from "src/lib/api";
import { base64toObjectUrl, toUint8Array } from "src/services/Utils";
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
  const [fileError, setFileError] = useState();

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
        if (!fileContent) return setFileError("File not found");
        setDocument(base64toObjectUrl(fileContent));
      } catch (error) {
        // console.error(error);
        setFileError("File not found");
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
          <h2 className="text-white mix-blend-difference text-[4vw] xs:text-2xl transform-gpu">
            {documentName}
          </h2>
        </div>
      </div>
      <div ref={containerRef} className="document relative">
        {fileError && (
          <div
            className="bg-white w-full flex justify-center items-center"
            style={{ aspectRatio: "1/1.414" }}
          >
            <h1 className="text-black text-[8vw] xs:text-4xl">{fileError}</h1>
          </div>
        )}
        {isLoading && !fileError && <SkeletonFile />}
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
