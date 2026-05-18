"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpDown, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  rank: string;
  active: boolean;
  createdAt: string;
  rentalCount: number;
};

type SortKey =
    | "id"
    | "name"
    | "email"
    | "role"
    | "rank"
    | "active"
    | "createdAt"
    | "rentalCount";

type SortDirection = "asc" | "desc";

const rankColors: Record<string, string> = {
  BRONZE: "bg-[#CD7F32]/20 text-[#CD7F32]",
  SILVER: "bg-[#C0C0C0]/20 text-[#C0C0C0]",
  GOLD: "bg-[#FFD700]/20 text-[#FFD700]",
  PLATINUM: "bg-[#E5E4E2]/20 text-[#E5E4E2]",
  DIAMOND: "bg-[#B9F2FF]/20 text-[#B9F2FF]",
  VIP: "bg-[#76ABAE]/20 text-[#76ABAE]",
};

export default function UsersManager({ users }: { users: User[] }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const pageSize = 15;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const handleSort = (key: SortKey) => {
    setPage(1);

    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = users.filter((user) => {
      if (!query) return true;

      const searchableText = [
        user.id,
        user.name,
        user.email,
        user.role,
        user.active ? "active enabled yes" : "disabled inactive no",
        user.rank,
        user.rentalCount,
        formatDate(user.createdAt),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    filtered.sort((a, b) => {
        let aValue: string | number | boolean = "";
        let bValue: string | number | boolean = "";

        if (sortKey === "createdAt") {
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
        } else {
            aValue = a[sortKey] ?? "";
            bValue = b[sortKey] ?? "";
        }

        if (typeof aValue === "boolean") {
            aValue = aValue ? 1 : 0;
        }

        if (typeof bValue === "boolean") {
            bValue = bValue ? 1 : 0;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        const result = String(aValue).localeCompare(String(bValue), undefined, {
            numeric: true,
            sensitivity: "base",
        });

        return sortDirection === "asc" ? result : -result;
    });

    return filtered;
  }, [users, search, sortKey, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedUsers.length / pageSize)
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const startIndex = (page - 1) * pageSize;

  const paginatedUsers = filteredAndSortedUsers.slice(
    startIndex,
    startIndex + pageSize
  );

  const sortableHead = (label: string, key: SortKey) => (
    <TableHead>
      <button
        type="button"
        onClick={() => handleSort(key)}
        className="flex items-center gap-1 whitespace-nowrap transition hover:text-[#76ABAE]"
      >
        {label}
        <ArrowUpDown
          className={`h-3 w-3 ${
            sortKey === key ? "text-[#76ABAE]" : "opacity-40"
          }`}
        />
      </button>
    </TableHead>
  );

  return (
    <>
      <Link
        href="/admin"
        className="mt-24 inline-block px-6 py-2 text-white hover:underline"
      >
        <ArrowLeft className="mr-2 inline-block h-4 w-4" />
        Back to Admin Panel
      </Link>

      <div className="flex w-full flex-col items-center px-8 py-15">
        <h1 className="mb-2 text-3xl font-bold">Manage Users</h1>

        <p className="mb-8 text-lg text-gray-400">
          View registered users, roles, and rental activity.
        </p>

        <div className="mb-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search users by name, email, role..."
              className="dark pl-9"
            />
          </div>

          <p className="text-sm text-gray-400">
            Showing {paginatedUsers.length} of {filteredAndSortedUsers.length}{" "}
            users
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/10">
          <Table className="dark">
            <TableHeader>
              <TableRow>
                {sortableHead("Id", "id")}
                {sortableHead("Name", "name")}
                {sortableHead("Email", "email")}
                {sortableHead("Role", "role")}
                {sortableHead("Rank", "rank")}
                {sortableHead("Active", "active")}
                {sortableHead("Rentals", "rentalCount")}
                {sortableHead("Created At", "createdAt")}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>

                    <TableCell>{user.name || "-"}</TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                        <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === "ADMIN"
                            ? "bg-[#76ABAE]/20 text-[#76ABAE]"
                            : "bg-white/10 text-[#EEEEEE]/70"
                        }`}
                        >
                        {user.role}
                        </span>
                    </TableCell>

                    <TableCell><span
                        className={`rounded-full px-3 py-1 text-xs font-semibold 
                            ${rankColors[user.rank] || "bg-white/10 text-[#EEEEEE]/70"}`}
                        >
                        {user.rank}
                        </span>
                    </TableCell>
                    <TableCell>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.active
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                        >
                            {user.active ? "Active" : "Disabled"}
                        </span>
                    </TableCell>

                    <TableCell>{user.rentalCount}</TableCell>

                    <TableCell>{formatDate(user.createdAt)}</TableCell>

                    <TableCell>
                        <Link href={`/admin/users/${user.id}/edit`}>
                            <Button variant="outline" size="sm" className="cursor-pointer">
                                Edit
                            </Button>
                        </Link>
                        
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                            size="sm"
                            className="cursor-pointer bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="dark">
                            <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete user {user.email}?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                                This action cannot be undone. If this user has
                                rentals, deleting may also fail unless your database
                                allows cascading deletes.
                            </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                                Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction asChild>
                                <Button
                                className="cursor-pointer bg-red-400 hover:bg-red-500"
                                onClick={async () => {
                                    const res = await fetch(
                                    `/api/users/${user.id}`,
                                    {
                                        method: "DELETE",
                                    }
                                    );

                                    const data = await res.json();

                                    if (!res.ok) {
                                    toast.error(
                                        data.error || "Failed to delete user.",
                                        {
                                        position: "top-center",
                                        }
                                    );
                                    return;
                                    }

                                    toast.success(
                                    `${user.email} deleted successfully.`,
                                    {
                                        position: "top-center",
                                    }
                                    );

                                    router.refresh();
                                }}
                                >
                                Delete User
                                </Button>
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                    </TableRow>
                ))}

                {paginatedUsers.length === 0 && (
                    <TableRow>
                    <TableCell
                        colSpan={9}
                        className="py-10 text-center text-gray-400"
                    >
                        No users found.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
                Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
                <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(current - 1, 1))}
                className="dark cursor-pointer"
                >
                Previous
                </Button>

                <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() =>
                    setPage((current) => Math.min(current + 1, totalPages))
                }
                className="dark cursor-pointer"
                >
                Next
                </Button>
          </div>
        </div>
      </div>
    </>
  );
}