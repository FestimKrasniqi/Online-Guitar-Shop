// src/pages/Models.tsx
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

export default function Models() {
  const { brandId } = useParams<{ brandId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);

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

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

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
      <h1 className="models-title">Guitar Models</h1>

      {/* Filters */}
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
              <p>Type: {model.type}</p>
              <p>Price: ${model.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {paginatedModels.length < filteredModels.length && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}
