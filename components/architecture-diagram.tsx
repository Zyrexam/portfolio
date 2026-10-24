type DiagramProject = "videoscale" | "workflow";

function Node({
  x,
  y,
  width = 158,
  title,
  detail,
}: {
  x: number;
  y: number;
  width?: number;
  title: string;
  detail: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="58" rx="9" fill="#fff" stroke="#d7d9dd" />
      <text x={x + 13} y={y + 25} fill="#17181a" fontSize="14.5" fontWeight="600">{title}</text>
      <text x={x + 13} y={y + 43} fill="#666a70" fontSize="12.5">{detail}</text>
    </g>
  );
}

function Arrow({
  d,
  label,
  markerId,
}: {
  d: string;
  label?: { x: number; y: number; text: string };
  markerId: string;
}) {
  return (
    <g>
      <path d={d} fill="none" stroke="#8b8e94" strokeWidth="1.4" markerEnd={`url(#${markerId})`} />
      {label && <text x={label.x} y={label.y} fill="#666a70" fontSize="11.5" textAnchor="middle">{label.text}</text>}
    </g>
  );
}

export function ArchitectureDiagram({ project }: { project: DiagramProject }) {
  const isVideo = project === "videoscale";
  const markerId = `${project}-arrow`;
  const mobileMarkerId = `${project}-mobile-arrow`;

  return (
    <>
    <svg
      aria-label={isVideo ? "VideoScale upload and processing architecture" : "Workflow Engine run and recovery architecture"}
      className="absolute inset-0 hidden h-full w-full sm:block"
      role="img"
      viewBox="0 0 720 420"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{isVideo ? "VideoScale request flow" : "Workflow Engine request flow"}</title>
      <defs>
        <marker id={markerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7" fill="none" stroke="#8b8e94" strokeWidth="1.2" />
        </marker>
      </defs>
      <rect width="720" height="420" fill="#fbfbfa" />
      <text x="32" y="31" fill="#666a70" fontSize="11.5" fontWeight="600" letterSpacing="1.5">
        {isVideo ? "VIDEO PROCESSING · REQUEST FLOW" : "DURABLE JOBS · REQUEST FLOW"}
      </text>

      {isVideo ? (
        <>
          <Node x={32} y={73} title="Web app" detail="Upload · track status" />
          <Node x={264} y={73} width={174} title="Spring Boot API" detail="Store video · create job" />
          <Node x={530} y={48} title="MinIO" detail="Original video" />
          <Node x={530} y={132} title="PostgreSQL" detail="Job: PENDING" />
          <Node x={264} y={218} width={174} title="Kafka" detail="Video processing queue" />
          <Node x={530} y={218} title="Worker + FFmpeg" detail="Transcode renditions" />
          <Node x={530} y={328} title="MinIO" detail="Processed videos" />
          <Node x={264} y={328} width={174} title="PostgreSQL" detail="Job: COMPLETED" />

          <Arrow markerId={markerId} d="M190 102 H257" label={{ x: 224, y: 92, text: "upload" }} />
          <Arrow markerId={markerId} d="M438 88 C478 88 483 77 523 77" />
          <Arrow markerId={markerId} d="M438 112 C480 112 478 161 523 161" />
          <Arrow markerId={markerId} d="M351 131 V211" label={{ x: 394, y: 177, text: "enqueue job" }} />
          <Arrow markerId={markerId} d="M438 247 H523" label={{ x: 480, y: 237, text: "consume" }} />
          <Arrow markerId={markerId} d="M609 276 V321" label={{ x: 655, y: 302, text: "save output" }} />
          <Arrow markerId={markerId} d="M530 250 C490 250 486 357 445 357" label={{ x: 482, y: 321, text: "update status" }} />
          <text x="32" y="374" fill="#666a70" fontSize="12">Client polls the API by job ID to see processing status.</text>
        </>
      ) : (
        <>
          <Node x={32} y={82} title="CLI" detail="run · status · resume" />
          <Node x={264} y={82} width={174} title="Workflow registry" detail="Resolve named steps" />
          <Node x={530} y={82} title="SQLite store" detail="Run + step state" />
          <Node x={530} y={218} title="Step runner" detail="Execute in order" />
          <Node x={264} y={218} width={174} title="Workflow steps" detail="Go functions" />
          <Node x={32} y={328} title="Retry / resume" detail="Backoff · recover" />
          <Node x={264} y={328} width={174} title="SQLite store" detail="Persist each result" />
          <Node x={530} y={328} title="Run result" detail="Completed · failed" />

          <Arrow markerId={markerId} d="M190 111 H257" label={{ x: 224, y: 101, text: "run name" }} />
          <Arrow markerId={markerId} d="M438 111 H523" label={{ x: 480, y: 101, text: "create run" }} />
          <Arrow markerId={markerId} d="M609 140 V211" label={{ x: 655, y: 178, text: "load state" }} />
          <Arrow markerId={markerId} d="M530 247 H445" label={{ x: 488, y: 237, text: "execute" }} />
          <Arrow markerId={markerId} d="M351 276 V321" label={{ x: 397, y: 303, text: "step outcome" }} />
          <Arrow markerId={markerId} d="M264 357 H197" label={{ x: 231, y: 347, text: "on failure" }} />
          <Arrow markerId={markerId} d="M190 357 H218 V300 H609 V283" label={{ x: 330, y: 293, text: "retry with backoff" }} />
          <Arrow markerId={markerId} d="M438 357 H523" label={{ x: 480, y: 347, text: "final state" }} />
          <text x="32" y="405" fill="#666a70" fontSize="12">After a crash, resume skips completed steps and continues from saved state.</text>
        </>
      )}
    </svg>
      <svg
        className="absolute inset-0 h-full w-full sm:hidden"
        role="img"
        aria-label={isVideo ? "VideoScale flow: web app, API, Kafka, FFmpeg worker, and storage" : "Workflow Engine flow: CLI, registry, SQLite, ordered step runner, and recovery"}
        viewBox="0 0 360 480"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker id={mobileMarkerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7" fill="none" stroke="#8b8e94" strokeWidth="1.2" />
          </marker>
        </defs>
        <rect width="360" height="480" fill="#fbfbfa" />
        <text x="28" y="30" fill="#666a70" fontSize="10" fontWeight="600" letterSpacing="1.3">
          {isVideo ? "VIDEO PROCESSING · REQUEST FLOW" : "DURABLE JOBS · REQUEST FLOW"}
        </text>
        {isVideo ? (
          <>
            <Node x={42} y={52} width={276} title="Web app" detail="Upload · track status" />
            <Node x={42} y={126} width={276} title="Spring Boot API" detail="Save original · create job" />
            <Node x={42} y={200} width={276} title="Kafka" detail="Queue background work" />
            <Node x={42} y={274} width={276} title="Worker + FFmpeg" detail="Transcode video renditions" />
            <Node x={42} y={348} width={276} title="MinIO + PostgreSQL" detail="Store outputs · update status" />
            <path d="M180 110 V120 M180 184 V194 M180 258 V268 M180 332 V342" fill="none" stroke="#8b8e94" strokeWidth="1.5" markerEnd={`url(#${mobileMarkerId})`} />
            <text x="42" y="444" fill="#666a70" fontSize="11">The client checks progress using the job ID.</text>
          </>
        ) : (
          <>
            <Node x={42} y={52} width={276} title="CLI" detail="Run · check · resume a workflow" />
            <Node x={42} y={126} width={276} title="Workflow registry" detail="Find the named Go steps" />
            <Node x={42} y={200} width={276} title="SQLite" detail="Create run · save step state" />
            <Node x={42} y={274} width={276} title="Step runner" detail="Run functions in order · retry failures" />
            <Node x={42} y={348} width={276} title="SQLite" detail="Persist results · resume after a crash" />
            <path d="M180 110 V120 M180 184 V194 M180 258 V268 M180 332 V342" fill="none" stroke="#8b8e94" strokeWidth="1.5" markerEnd={`url(#${mobileMarkerId})`} />
            <text x="42" y="444" fill="#666a70" fontSize="11">Resume skips completed steps and continues from saved state.</text>
          </>
        )}
      </svg>
    </>
  );
}
