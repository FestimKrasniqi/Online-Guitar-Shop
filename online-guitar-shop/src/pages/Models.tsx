// src/pages/Models.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_MODELS_BY_BRAND, SEARCH_MODELS } from "../queries";
import { Link, useParams } from "react-router-dom";
import type { GetBrandModelsData, SearchModelsData, BrandModel } from "../types";
import "./Models.css";

export default function Models() {
  const { brandId } = useParams<{ brandId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { data, loading, error } = useQuery<GetBrandModelsData>(
    GET_MODELS_BY_BRAND,
    {
      variables: {
        id: brandId,
        sortBy: { field: "name", order: "ASC" },
      },
    }
  );

  const { data: searchData } = useQuery<SearchModelsData>(SEARCH_MODELS, {
    variables: { brandId: brandId!, name: searchTerm },
    skip: searchTerm === "",
  });

  const models: BrandModel[] = searchTerm
    ? searchData?.searchModels ?? []
    : data?.findBrandModels ?? [];

  const filteredModels = typeFilter
    ? models.filter((m) => m.type.toLowerCase() === typeFilter.toLowerCase())
    : models;

  const paginatedModels = filteredModels.slice(0, page * pageSize);
  const loadMore = () => setPage((prev) => prev + 1);

  const guitarTypes = Array.from(
    new Set(models.map((m) => m.type).filter(Boolean))
  );

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="models-container">
      <h1 className="models-title">Guitar Models</h1>

      <div className="models-filters">
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="models-search"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="models-select"
        >
          <option value="">All Types</option>
          {guitarTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="models-grid">
        {paginatedModels.map((model) => (
          <Link
            key={model.id}
            to={`/brands/${brandId}/models/${model.id}`}
            className="model-card"
          >
            <div className="model-image-container">
              <img src={model.image} alt={model.name} />
            </div>
            <div className="model-info">
              <h3>{model.name}</h3>
              <p>Type: {model.type}</p>
              <p>Price: ${model.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {paginatedModels.length < filteredModels.length && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}
