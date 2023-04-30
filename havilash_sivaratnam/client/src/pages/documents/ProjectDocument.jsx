import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate, useParams } from 'react-router';
import { MdOutlineFileDownload } from 'react-icons/md';
import { BsPlay } from 'react-icons/bs';
import data from 'src/data';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function getProjectByTitle(title) {
  return data.projects.find((project) => project.title === title);
}

export default function ProjectDocument() {
  const navigate = useNavigate();
  const { ["project"]: projectTitle } = useParams();
  const project = getProjectByTitle(projectTitle);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef();

  function handleResize() {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }

  useEffect(() => {
    if (project?.document) {
      setDocumentUrl(`/assets/documents/${project.document}`);
    } else {
      navigate('/projects')
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    handleResize();
  }, [containerRef.current])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return documentUrl && (
    <section className="section p-48 min-h-screen">
      <div className='flex flex-row items-center h-16 justify-between'>
        <div className='flex flex-row items-center gap-4'>
          <a href={documentUrl} download><MdOutlineFileDownload className='text-primary-color hover:opacity-80' size='4rem'/></a>
          <h2 className='text-white mix-blend-difference'>{project.document}</h2>
        </div>
        <a href={project.href} target='_blank' rel='noreferrer'><BsPlay className='text-white bg-primary-color rounded-md hover:opacity-80' size='3rem' /></a>
      </div>
      <div ref={containerRef} className="document h-auto w-full flex items-center justify-center">
        {
          <Document file={documentUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page 
                className='shadow-lg'
                key={`page_${index + 1}`} 
                pageNumber={index +  1}
                width={containerWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false} />
            ))}
          </Document>
        }
      </div>
    </section>
  );
}