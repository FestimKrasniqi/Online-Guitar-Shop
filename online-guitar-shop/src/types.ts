// src/types.ts
export type BrandModel = {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
};

export type GetBrandModelsData = {
  findBrandModels: BrandModel[];
};

export type SearchModelsData = {
  searchModels: BrandModel[];
};
