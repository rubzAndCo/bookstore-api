export type BookDetails = {
  nbPage?: number,
  length?: number,
  width?: number,
  EAN?: number,
  weight?: number,
  support?: string,
  distributor?: string
}

export type RawBookDetails = {
  nbPage?: number | null
  length?: number | null
  width?: number | null
  EAN?: number | null
  weight?: number | null
  support?: string | null
  distributor?: string | null
}