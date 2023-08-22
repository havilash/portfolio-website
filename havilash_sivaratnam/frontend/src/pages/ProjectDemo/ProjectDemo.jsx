import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectByTitle } from "src/services/Utils";

export default function ProjectDemo() {
  const navigate = useNavigate();
  const { ["project"]: projectTitle } = useParams();
  const project = getProjectByTitle(projectTitle);

  useEffect(() => {
    if (!project) {
      navigate("/projects");
    }
  }, [project, navigate]);

  return (
    <section className="section h-screen w-full flex justify-center items-center">
      <div className="p-8 bg-block-color rounded-lg relative shadow-xl">
        <div className="w-[60vw] h-[60vh] bg-white">
          <pre className="text-black">
            {JSON.stringify(project, null, "\t")}
          </pre>
        </div>
      </div>
    </section>
  );
}
