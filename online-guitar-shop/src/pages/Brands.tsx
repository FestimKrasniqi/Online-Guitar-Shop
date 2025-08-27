
import Footer from "../components/footer";
import { useQuery } from "@apollo/client/react";
import { GET_BRANDS } from "../queries";
import { Link } from "react-router-dom";
import type { Brand } from "../types";
import "./Brands.css";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Brands() {
  const { language } = useLanguage();
  const t = translations[language];

  const { data, loading, error } = useQuery<{ findAllBrands: Brand[] }>(
    GET_BRANDS
  );

  if (loading) return <p>{t.loading}</p>;
  if (error)
    return (
      <p>
        {t.error} {error.message}
      </p>
    );

  const brands = data?.findAllBrands ?? [];

  return (
    <div className="brands-container">
      <h1 className="brands-title">{t.brandsTitle}</h1>

      <div className="brands-grid">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/brands/${brand.id}`}
            className="brand-card"
          >
            <div className="brand-image-container">
              <img src={brand.image} alt={brand.name} />
            </div>
            <div className="brand-info">
              <h3>{brand.name}</h3>
              {brand.origin && (
                <p>
                  {t.origin}: {brand.origin}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}
