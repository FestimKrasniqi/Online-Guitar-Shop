// src/queries.ts
import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      image
    }
  }
`;

export const GET_MODELS_BY_BRAND = gql`
  query ($brandId: ID!, $search: String, $type: String) {
    models(brandId: $brandId, search: $search, type: $type) {
      id
      name
      type
      imageUrl
    }
  }
`;

export const GET_GUITAR_DETAILS = gql`
  query ($id: ID!) {
    guitar(id: $id) {
      id
      name
      type
      imageUrl
      specs {
        key
        value
      }
      musicians {
        id
        name
        photoUrl
      }
    }
  }
`;
