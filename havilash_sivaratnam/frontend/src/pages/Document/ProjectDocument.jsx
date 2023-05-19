import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsPlay } from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";
import data from "src/data";

import "./Document.css";
import { Link } from "react-router-dom";
import SkeletonFile from "src/components/skeletons/SkeletonFile/SkeletonFile";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function getProjectByTitle(title) {
  return data.projects.find(
    (project) => project.title.toLowerCase() === title.toLowerCase()
  );
}

export default function ProjectDocument() {
  const navigate = useNavigate();
  const { ["project"]: projectTitle } = useParams();
  const project = getProjectByTitle(projectTitle);
  const [documentUrl, setDocumentUrl] = useState(null);
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
    if (project?.document) {
      setDocumentUrl(`/assets/documents/projects/${project.document}`);
    } else {
      navigate("/projects");
    }

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
    documentUrl && (
      <section className="section pt-16 sm:p-24 lg:p-48 min-h-screen">
        <div className="document__data">
          <div className="flex flex-row items-center gap-4">
            <a href={documentUrl} download>
              <MdOutlineFileDownload className="document__data__download" />
            </a>
            <h2 className="text-white mix-blend-difference text-[5vw] xs:text-2xl">
              {project.document}
            </h2>
          </div>
          <div className="flex flex-row items-center gap-4">
            <a href={project.href} target="_blank" rel="noreferrer">
              <BiCodeAlt className="document__data__button" />
            </a>
            {project.demo && (
              <Link
                to={`/projects/${project.title.toLowerCase()}/demo`}
                target="_blank"
                rel="noreferrer"
              >
                <BsPlay className="document__data__button" />
              </Link>
            )}
          </div>
        </div>
        <div ref={containerRef} className="document">
          {isLoading && <SkeletonFile />}
          {
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
          }
        </div>
      </section>
    )
  );
}
