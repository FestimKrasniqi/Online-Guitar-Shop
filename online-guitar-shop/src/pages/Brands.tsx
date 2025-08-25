// src/pages/Brands.tsx
import { useQuery } from "@apollo/client/react";
import { GET_BRANDS } from "../queries";
import { Link } from "react-router-dom";

export default function Brands() {
  const { data, loading, error } = useQuery(GET_BRANDS);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1>Guitar Brands</h1>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {(data as { findAllBrands: any[] }).findAllBrands.map((b: any) => (
          <Link
            key={b.id}
            to={`/brands/${b.id}`}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <img src={b.image} alt={b.name} style={{ width: "100%" }} />
            <h3>{b.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
