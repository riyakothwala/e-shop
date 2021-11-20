import { Product } from "./Product";

export interface productOnCart {
    title: string, type: string, description: string, filename: string, rating: number, pricePerItem: number, quantityPresent: number, quantityToAddOrRemove: number, totalProductCost: number;
}