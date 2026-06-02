export type RankName =
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "DIAMOND"
  | "VIP";

export const rankDiscounts: Record<RankName, number> = {
  BRONZE: 0,
  SILVER: 5,
  GOLD: 10,
  PLATINUM: 15,
  DIAMOND: 20,
  VIP: 25,
};

export function getRankDiscount(rank?: string | null) {
  if (!rank) return 0;

  return rankDiscounts[rank as RankName] ?? 0;
}

export function applyRankDiscount(totalPrice: number, rank?: string | null) {
  const discountPercent = getRankDiscount(rank);
  const discountAmount = Math.round((totalPrice * discountPercent) / 100);
  const finalPrice = totalPrice - discountAmount;

  return {
    discountPercent,
    discountAmount,
    finalPrice,
  };
}