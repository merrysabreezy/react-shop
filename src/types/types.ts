export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews: Review[];
  availabilityStatus: string;
  minimumOrderQuantity: number;
}

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductReviewProps {
  reviews: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface StarRatingProps {
  rating: number;
}

export interface IDevice {
  PHONE: number;
  TABLET: number;
  DESKTOP: number;
  DESKTOP_XL: number;
}

export interface IWidthArgs {
  isMobile?: boolean;
  isTablet?: boolean;
  isLaptop?: boolean;
  isDesktopXL?: boolean;
}
