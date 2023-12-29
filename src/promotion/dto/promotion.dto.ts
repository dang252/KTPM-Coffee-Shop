export class createPromotionRequest {
    promotionName: string;

    promotionDesc: string;

    startDate: Date;

    endDate: Date;

    discountRate: number;

    promotionType: string;

    productIds?: number[];

    categories?: string[];
}
