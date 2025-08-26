import { useEffect, useMemo, useState } from "react";

const RotatingQuotes = ({ intervalMs = 10000, className = "" }) => {
  const summaries = useMemo(
    () => [
      {
        title: "Cloud Native Web Application",
        lines: [
          "Cloud‑native app deployed on AWS with CI/CD and IaC.",
          "Auto‑scaling services, secure endpoints, and full observability.",
        ],
      },
      {
        title: "Spotify Clone",
        lines: [
          "Full‑stack music streaming clone with auth and playlists.",
          "Responsive UI and smooth playback with a modern web stack.",
        ],
      },
      {
        title: "Delivery Management System",
        lines: [
          "Spring Boot backend for orders, drivers, and route planning.",
          "REST APIs, persistence, and role‑based access control.",
        ],
      },
      {
        title: "VehiRentHub",
        lines: [
          "OO‑designed car rental platform: inventory, booking, pricing.",
          "Applied design patterns and clean modular architecture.",
        ],
      },
      {
        title: "Echo Tweets",
        lines: [
          "UX design for a micro‑blog companion focused on insights.",
          "Flows for curation, scheduling, and lightweight analytics.",
        ],
      },
      {
        title: "Real‑Time Chat Application",
        lines: [
          "Socket‑driven chat with rooms, typing indicators, and presence.",
          "Persists history and delivers a snappy real‑time UX.",
        ],
      },
      {
        title: "NU Merchandise",
        lines: [
          "E‑commerce experience with catalog, cart, and checkout.",
          "Admin workflows for inventory and order management.",
        ],
      },
      {
        title: "Bone Marrow Donation System",
        lines: [
          "Java Swing app for donor‑recipient matching and workflows.",
          "Data validation, tracking, and reporting built‑in.",
        ],
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % summaries.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, summaries.length]);

  const current = summaries[index];

  return (
    <div className={`mb-4 max-w-[480px] mx-auto lg:mx-0 ${className}`}>
      <div className="font-semibold text-white/90">{current.title}</div>
      <p className="text-white/70 leading-relaxed">{current.lines[0]}</p>
      <p className="text-white/70 leading-relaxed">{current.lines[1]}</p>
    </div>
  );
};

export default RotatingQuotes;


