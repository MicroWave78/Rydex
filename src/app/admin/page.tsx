import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Rydex",
};

export default async function AdminWrapper() {
    
    return (
        <div className="w-full flex flex-col items-center mt-24 py-20">
            <h1 className="text-3xl font-bold mb-2 p">Admin Panel</h1>
            <p className="text-lg text-gray-500 mb-8">Manage your car rental service here.</p>
            
            <div className="dark grid grid-cols-1 md:grid-cols-2 mt-8 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Cars</CardTitle>
                        <CardDescription>Add, edit, or remove cars from your fleet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500">View and manage your car inventory.</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Link href="/admin/cars" className="inline-block bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5A8B8E] transition">
                            Go to Cars
                        </Link>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Rentals</CardTitle>
                        <CardDescription>View and manage customer rentals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500">Review and update rental information.</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Link href="/admin/rentals" className="inline-block bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5A8B8E] transition">
                            Go to Rentals
                        </Link>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Users</CardTitle>
                        <CardDescription>View and manage user accounts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500">Administer user permissions and profiles.</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Link href="/admin/users" className="inline-block bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5A8B8E] transition">
                            Go to Users
                        </Link>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Manage Messages</CardTitle>
                        <CardDescription>View and manage user messages.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500">Review and respond to user messages.</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Link href="/admin/messages" className="inline-block bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5A8B8E] transition">
                            Go to Messages
                        </Link>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Check Analytics</CardTitle>
                        <CardDescription>View and analyze your rental data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500">Review reports and metrics for your car rental service.</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Link href="/admin/analytics" className="inline-block bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5A8B8E] transition">
                            Go to Analytics
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}