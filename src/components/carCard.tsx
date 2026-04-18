export default function CarCard() {
    return (
        <div className="w-full h-64 bg-[#EEEEEE] rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Car Name</h2>
            <p className="text-gray-700 mb-4">Car description goes here. It can include details about the car's features, performance, and more.</p>
            <button className="px-4 py-2 bg-[#31363F] text-[#EEEEEE] rounded hover:bg-[#555555] transition-colors duration-200">View Details</button>
        </div>
    );
}