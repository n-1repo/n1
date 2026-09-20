"use client";

import { useState } from "react";
import type { Project } from "./content";

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [openNums, setOpenNums] = useState<Set<string>>(new Set());

  function toggle(num: string) {
    setOpenNums((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  return (
    <div style={{ marginTop: 24 }}>
      {projects.map((project) => {
        const isOpen = openNums.has(project.num);
        const bodyId = `project-body-${project.num}`;
        return (
          <div className={`project${isOpen ? " open" : ""}`} key={project.num}>
            <button
              type="button"
              className="project-trigger"
              aria-expanded={isOpen}
              aria-controls={bodyId}
              onClick={() => toggle(project.num)}
            >
              <div className="heading">
                <span className="num">PROJECT {project.num}</span>
                <span className="title">{project.title}</span>
              </div>
              <span className="chev" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div className="project-body-wrap" id={bodyId}>
              <div className="project-body">
                <div className="project-position">&quot;{project.position}&quot;</div>

                <div className="subhead">Problem</div>
                <p style={{ fontSize: 13.5, margin: 0 }}>{project.problem}</p>

                <div className="subhead">Solution</div>
                <p style={{ fontSize: 13.5, margin: 0 }}>{project.solution}</p>

                {project.flow && (
                  <div className="panel" style={{ textAlign: "center", marginTop: 12, fontSize: 12.5, fontWeight: 700 }}>
                    {project.flow}
                  </div>
                )}

                <div className="grid grid-2" style={{ marginTop: 12 }}>
                  <div className="panel">
                    <h4 style={{ margin: "0 0 8px 0", fontSize: 11.5, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      Function
                    </h4>
                    <ul className="clean">
                      {project.function.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="panel">
                    <h4 style={{ margin: "0 0 8px 0", fontSize: 11.5, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      Impact
                    </h4>
                    <ul className="clean">
                      {project.impact.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="subhead">What N-1 Labs Learned / Built</div>
                <p style={{ fontSize: 13.5, margin: 0 }}>{project.learned}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
