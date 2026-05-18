import { Rank } from "@prisma/client";

export function getRankFromRentals(totalRentals: number): Rank {
  if (totalRentals >= 50) return Rank.DIAMOND;
  if (totalRentals >= 30) return Rank.PLATINUM;
  if (totalRentals >= 15) return Rank.GOLD;
  if (totalRentals >= 5) return Rank.SILVER;

  return Rank.BRONZE;
}