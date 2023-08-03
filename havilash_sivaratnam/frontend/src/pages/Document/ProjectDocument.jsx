import { useEffect, useRef, useState } from "react";
import { BiCodeAlt } from "react-icons/bi";
import { BsPlay } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router";
import data from "src/data";

import { Link } from "react-router-dom";
import SkeletonFile from "src/components/skeletons/SkeletonFile/SkeletonFile";
import "./Document.css";
import { getProjectByTitle, isValidUrl } from "src/services/Utils";
import { getRepoFile } from "src/lib/api";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ProjectDocument() {
  const navigate = useNavigate();
  const { ["project"]: projectTitle } = useParams();
  const project = getProjectByTitle(projectTitle);
  const [documentUrl, setDocumentUrl] = useState(null);
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
    async function checkDocument() {
      if (!project) return navigate("/projects");

      if (project.document) {
        setDocumentUrl(`/documents/projects/${project.document}`);
      } else if (project.repoDocument) {
        const repo = project.repo;
        try {
          const data = await getRepoFile(repo, project?.repoDocument);
          if (data) {
            setDocumentUrl(data.download_url);
          }
        } catch (error) {
          // console.error(error);
          setFileError("File not found");
        }
      } else {
        setFileError("In progress ...");
      }
    }

    checkDocument();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <a href={documentUrl} download={`Abstract_${project.title}`}>
            <MdOutlineFileDownload className="document__data__download" />
          </a>
          <h2 className="text-white mix-blend-difference text-[4vw] xs:text-2xl">
            {`Abstract_${project.title}`}
          </h2>
        </div>
        <div className="flex flex-row items-center gap-4">
          <a href={project.href} target="_blank" rel="noreferrer">
            <BiCodeAlt className="document__data__button" />
          </a>
          {project.demo &&
            (isValidUrl(project.demo) ? (
              <a href={project.demo} target="_blank" rel="noreferrer">
                <BsPlay className="document__data__button" />
              </a>
            ) : (
              <Link to={`/projects/${project.title.toLowerCase()}/demo`}>
                <BsPlay className="document__data__button" />
              </Link>
            ))}
        </div>
      </div>
      <div ref={containerRef} className="document">
        {fileError && (
          <div
            className="bg-white w-full flex justify-center items-center"
            style={{ aspectRatio: "1/1.414" }}
          >
            <h1 className="text-black text-[8vw] xs:text-4xl">{fileError}</h1>
          </div>
        )}
        {isLoading && !fileError && <SkeletonFile />}
        {documentUrl && (
          <Document
            file={documentUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading=""
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                className="shadow-lg"
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading=""
              />
            ))}
          </Document>
        )}
      </div>
    </section>
  );
}
