// src/pages/Brands.tsx
import { useQuery } from "@apollo/client/react";
import { GET_BRANDS } from "../queries";
import { Link } from "react-router-dom";
import "./Brands.css"; // import the CSS file

export default function Brands() {
  const { data, loading, error } = useQuery(GET_BRANDS);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="brands-container">
      <h1 className="brands-title">Guitar Brands</h1>

      <div className="brands-grid">
        {(data as { findAllBrands: any[] }).findAllBrands.map((b: any) => (
          <Link key={b.id} to={`/brands/${b.id}`} className="brand-card">
            <div className="brand-image-container">
              <img src={b.image} alt={b.name} />
            </div>
            <div className="brand-info">
              <h3>{b.name}</h3>
              {b.origin && <p>Origin: {b.origin}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
