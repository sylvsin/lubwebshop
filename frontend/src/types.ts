export interface IProduct {
    _id: string;
    name: string;
    slug: string;
    category: string;
    image: string;
    price: number;
    countInStock: number;
    brand: string;
    rating: number;
    numReviews: number;
    description: string; 
}