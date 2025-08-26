import Footer from "../components/footer";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_MODELS_BY_BRAND, SEARCH_MODELS } from "../queries";
import { Link, useParams } from "react-router-dom";
import type {
  GetBrandModelsData,
  SearchModelsData,
  BrandModel,
} from "../types";
import "./Models.css";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Models() {
  const { brandId } = useParams<{ brandId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const { language } = useLanguage();
  const t = translations[language];

  const pageSize = 6;

  // Query: fetch all models for brand
  const { data, loading, error } = useQuery<GetBrandModelsData>(
    GET_MODELS_BY_BRAND,
    {
      variables: { id: brandId, sortBy: { field: "name", order: "ASC" } },
    }
  );

  // Query: fetch models by search
  const { data: searchData } = useQuery<SearchModelsData>(SEARCH_MODELS, {
    variables: { brandId: brandId!, name: searchTerm },
    skip: !searchTerm,
  });

  if (loading) return <p>{t.loading}</p>;
  if (error)
    return (
      <p>
        {t.error} {error.message}
      </p>
    );

  const models: BrandModel[] = searchTerm
    ? searchData?.searchModels ?? []
    : data?.findBrandModels ?? [];

  // Apply filters
  const filteredModels = typeFilter
    ? models.filter((m) => m.type.toLowerCase() === typeFilter.toLowerCase())
    : models;

  // Pagination
  const paginatedModels = filteredModels.slice(0, page * pageSize);
  const loadMore = () => setPage((prev) => prev + 1);

  // Unique types
  const guitarTypes = Array.from(
    new Set(models.map((m) => m.type).filter(Boolean))
  );

  return (
    <div className="models-container">
      <Link to={`/brands/${brandId}`} className="back-button">
        &larr; {t.backToHome}
      </Link>
      <h1 className="models-title">{t.modelsTitle}</h1>

      {/* Filters */}
      <div className="models-filters">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="models-search"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="models-select"
        >
          <option value="">{t.allTypes}</option>
          {guitarTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Models Grid */}
      <div className="models-grid">
        {paginatedModels.map((model) => (
          <Link
            key={model.id}
            to={`/guitars/${model.id}`}
            state={{ brandId }}
            className="model-card"
          >
            <div className="model-image-container">
              <img src={model.image} alt={model.name} />
            </div>
            <div className="model-info">
              <h3>{model.name}</h3>
              <p>
                {t.type}: {model.type}
              </p>
              <p>
                {t.price}: ${model.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {paginatedModels.length < filteredModels.length && (
        <button className="load-more" onClick={loadMore}>
          {t.loadMore}
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
