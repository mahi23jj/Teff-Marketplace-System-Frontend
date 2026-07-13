import { api } from "./axios";
import { endpoints } from "./endpoints";
import type {
  FarmerBusinessOverview,
  FarmerListing,
  FarmerOrdersResponse,
  FarmerOverview,
  FarmerRecentSale,
  MarketActivityData,
  MarketPeriod,
  MarketplaceHealth,
  MarketplaceOverview,
  MarketStats,
  MarketTrendLiveData,
  MarketTrendPoint,
  Order,
  OrderStatus,
  ProductTypeOption,
} from "@/types/api.types";
import { buildFormData } from "@/lib/utils";

export interface CreateListingRequest {
  productTypeId: string;
  quantity: number;
  unit: string;
  price: number;
  description: string;
  images: File[];
}

export interface UpdateListingRequest {
  quantity?: number;
  unit?: string;
  price?: number;
  description?: string;
  images?: string[];
}

export interface FarmerOrdersParams {
  query?: string;
  status?: OrderStatus;
  page?: number;
  pageSize?: number;
}

export const farmerApi = {
  getProductTypes: async (): Promise<ProductTypeOption[]> => {
    const { data } = await api.get<ProductTypeOption[]>(endpoints.farmer.productTypes());
    return data;
  },

  getMyListings: async (): Promise<FarmerListing[]> => {
    const { data } = await api.get<FarmerListing[]>(endpoints.farmer.listings());
    return data;
  },

  createListing: async (payload: CreateListingRequest): Promise<FarmerListing> => {
    const formData = buildFormData(
      {
        productTypeId: payload.productTypeId,
        quantity: payload.quantity,
        unit: payload.unit,
        price: payload.price,
        description: payload.description,
      },
      [{ key: "images", files: payload.images }]
    );
    const { data } = await api.post<FarmerListing>(endpoints.farmer.createListing(), formData);
    return data;
  },

  updateListing: async (id: string, payload: UpdateListingRequest): Promise<FarmerListing> => {
    const { data } = await api.put<FarmerListing>(endpoints.farmer.listing(id), payload);
    return data;
  },

  deleteListing: async (id: string): Promise<void> => {
    await api.delete(endpoints.farmer.listing(id));
  },

  getOverview: async (): Promise<FarmerOverview> => {
    const { data } = await api.get<FarmerOverview>(endpoints.farmer.dashboardOverview());
    return data;
  },

  getMarketTrend: async (
    productTypeId: string,
    period: MarketPeriod
  ): Promise<MarketTrendPoint[]> => {
    const { data } = await api.get<MarketTrendPoint[]>(endpoints.farmer.dashboardTrend(), {
      params: { productTypeId, period },
    });
    return data;
  },

  getMarketStats: async (productTypeId: string): Promise<MarketStats> => {
    const { data } = await api.get<MarketStats>(endpoints.farmer.dashboardStats(productTypeId));
    return data;
  },

  getRecentSales: async (): Promise<FarmerRecentSale[]> => {
    const { data } = await api.get<FarmerRecentSale[]>(endpoints.farmer.dashboardRecentSales());
    return data;
  },

  getOrders: async (params?: FarmerOrdersParams): Promise<FarmerOrdersResponse> => {
    const { data } = await api.get<FarmerOrdersResponse>(endpoints.farmer.orders(), { params });
    return data;
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    const { data } = await api.patch<Order>(endpoints.farmer.orderStatus(id), { status });
    return data;
  },

  // ── Dashboard Redesign ──

  getFarmerBusinessOverview: async (): Promise<FarmerBusinessOverview> => {
    const { data } = await api.get<FarmerBusinessOverview>(endpoints.farmer.farmerBusinessOverview());
    return data;
  },

  getMarketplaceOverview: async (productTypeId: string): Promise<MarketplaceOverview> => {
    const { data } = await api.get<MarketplaceOverview>(endpoints.farmer.marketplaceOverview(), {
      params: { productTypeId },
    });
    return data;
  },

  getMarketActivityData: async (productTypeId: string): Promise<MarketActivityData> => {
    const { data } = await api.get<MarketActivityData>(endpoints.farmer.marketActivity(), {
      params: { productTypeId },
    });
    return data;
  },

  getMarketTrendLive: async (productTypeId: string): Promise<MarketTrendLiveData> => {
    const { data } = await api.get<MarketTrendLiveData>(endpoints.farmer.marketTrendLive(), {
      params: { productTypeId },
    });
    return data;
  },

  getMarketplaceHealth: async (productTypeId: string): Promise<MarketplaceHealth> => {
    const { data } = await api.get<MarketplaceHealth>(endpoints.farmer.marketplaceHealth(), {
      params: { productTypeId },
    });
    return data;
  },
};
