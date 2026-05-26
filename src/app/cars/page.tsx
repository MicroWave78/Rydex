import CarsGrid from "./CarsGrid";
import prisma from "@/lib/prisma";

export default async function Cars() {
    const cars = await prisma.car.findMany({
        include: {
            reviews: {
                select: {
                    rating: true,
                },
            },

            _count: {
                select: {
                    reviews: true,
                },
            },
        },
        orderBy: {
            pricePerDay: "asc"
        }
    });
    const formattedCars = cars.map((car) => {
        const averageRating =
            car.reviews.length > 0
            ? car.reviews.reduce(
                (acc, review) => acc + review.rating,
                0
                ) / car.reviews.length
            : null;

        return {
            ...car,
            averageRating,
            reviewCount: car._count.reviews,
        };
    });

    return (
        <div id="cars">
            <CarsGrid cars={formattedCars} />
        </div>
    );
}