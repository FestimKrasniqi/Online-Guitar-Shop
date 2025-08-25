// src/queries.ts
import { gql } from "@apollo/client";

// ----------------------------------
// 1️⃣ Get all brands
// ----------------------------------
export const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      origin
      image
      categories
    }
  }
`;

// ----------------------------------
// 2️⃣ Get models for a specific brand with sorting
// ----------------------------------
export const GET_MODELS_BY_BRAND = gql`
  query GetBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

// ----------------------------------
// 3️⃣ Search models by name
// ----------------------------------
export const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

// ----------------------------------
// 4️⃣ Get details of a specific guitar model
// ----------------------------------
export const GET_GUITAR_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;
