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

export type Specs = {
  bodyWood: string;
  neckWood: string;
  fingerboardWood: string;
  pickups: string;
  tuners: string;
  scaleLength: string;
  bridge: string;
};

export type Musician = {
  name: string;
  musicianImage: string;
  bands: string[];
};

export type Model = {
  id: string;
  name: string;
  type: string;
  image: string;
  description?: string;
  price: number;
  specs: Specs;
  musicians: Musician[];
};

export type Brand = {
  id: string;
  name: string;
  origin?: string;
  image: string;
  description?: string;
};


