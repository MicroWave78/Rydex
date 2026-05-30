"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  ArrowUpDown,
  CheckCircle2,
  Eye,
  Mail,
  Reply,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import AdminManagerLayout from "@/components/admin/AdminManagerLayout";

type Message = {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  message: string;
  createdAt: string;
};

type SortKey =
  | "id"
  | "name"
  | "email"
  | "phone"
  | "type"
  | "status"
  | "createdAt";

type SortDirection = "asc" | "desc";

const statusColors: Record<string, string> = {
  UNREAD: "bg-[#76ABAE]/20 text-[#76ABAE]",
  READ: "bg-white/10 text-[#EEEEEE]/70",
  REPLIED: "bg-green-500/10 text-green-400",
  ARCHIVED: "bg-yellow-500/10 text-yellow-400",
};

export default function MessagesManager({
  messages,
}: {
  messages: Message[];
}) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString();
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

  const updateMessageStatus = async (id: number, status: string) => {
    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to update message.", {
        position: "top-center",
      });
      return;
    }

    toast.success(`Message marked as ${status.toLowerCase()}.`, {
      position: "top-center",
    });

    router.refresh();
  };

  const filteredAndSortedMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = messages.filter((message) => {
      const matchesStatus =
        statusFilter === "ALL" || message.status === statusFilter;

      if (!matchesStatus) return false;

      if (!query) return true;

      const searchableText = [
        message.id,
        message.name,
        message.email,
        message.phone,
        message.type,
        message.status,
        message.message,
        formatDate(message.createdAt),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    filtered.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      if (sortKey === "createdAt") {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else {
        aValue = a[sortKey] ?? "";
        bValue = b[sortKey] ?? "";
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
  }, [messages, search, statusFilter, sortKey, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedMessages.length / pageSize)
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const startIndex = (page - 1) * pageSize;

  const paginatedMessages = filteredAndSortedMessages.slice(
    startIndex,
    startIndex + pageSize
  );

  const unreadCount = messages.filter((m) => m.status === "UNREAD").length;
  const repliedCount = messages.filter((m) => m.status === "REPLIED").length;
  const archivedCount = messages.filter((m) => m.status === "ARCHIVED").length;

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
      <AdminManagerLayout
        eyebrow="Manage Messages"
        title="User Messages"
        description="Review and respond to user messages."
      >

        <div className="mb-8 grid w-full gap-4 md:grid-cols-4">
          <StatCard label="Total Messages" value={messages.length} />
          <StatCard label="Unread" value={unreadCount} />
          <StatCard label="Replied" value={repliedCount} />
          <StatCard label="Archived" value={archivedCount} />
        </div>

        <div className="mb-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search messages by name, email, type..."
              className="dark pl-9"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="dark w-full md:w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="UNREAD">Unread</SelectItem>
                <SelectItem value="READ">Read</SelectItem>
                <SelectItem value="REPLIED">Replied</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-gray-400">
              Showing {paginatedMessages.length} of{" "}
              {filteredAndSortedMessages.length} messages
            </p>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/10">
          <Table className="dark">
            <TableHeader>
              <TableRow>
                {sortableHead("Id", "id")}
                {sortableHead("Status", "status")}
                {sortableHead("Name", "name")}
                {sortableHead("Email", "email")}
                {sortableHead("Phone", "phone")}
                {sortableHead("Type", "type")}
                <TableHead>Preview</TableHead>
                {sortableHead("Created At", "createdAt")}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedMessages.map((message) => (
                <TableRow
                  key={message.id}
                  className={
                    message.status === "UNREAD"
                      ? "bg-[#76ABAE]/5 font-semibold"
                      : ""
                  }
                >
                  <TableCell>{message.id}</TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusColors[message.status] ||
                        "bg-white/10 text-[#EEEEEE]/70"
                      }`}
                    >
                      {message.status}
                    </span>
                  </TableCell>

                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.phone || "-"}</TableCell>
                  <TableCell>{message.type}</TableCell>

                  <TableCell className="max-w-[280px] truncate text-[#EEEEEE]/70">
                    {message.message}
                  </TableCell>

                  <TableCell>{formatDate(message.createdAt)}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => {
                              if (message.status === "UNREAD") {
                                updateMessageStatus(message.id, "READ");
                              }
                            }}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="dark max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{message.type}</DialogTitle>
                            <DialogDescription>
                              Message #{message.id} received on{" "}
                              {formatDateTime(message.createdAt)}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="rounded-2xl bg-white/5 p-4 text-sm">
                              <div className="flex justify-between gap-4">
                                <span className="text-[#EEEEEE]/50">From</span>
                                <span>{message.name}</span>
                              </div>

                              <div className="mt-2 flex justify-between gap-4">
                                <span className="text-[#EEEEEE]/50">Email</span>
                                <span>{message.email}</span>
                              </div>

                              <div className="mt-2 flex justify-between gap-4">
                                <span className="text-[#EEEEEE]/50">Phone</span>
                                <span>{message.phone || "-"}</span>
                              </div>

                              <div className="mt-2 flex justify-between gap-4">
                                <span className="text-[#EEEEEE]/50">Status</span>
                                <span>{message.status}</span>
                              </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-[#222831] p-4">
                              <p className="whitespace-pre-wrap text-sm leading-6 text-[#EEEEEE]/80">
                                {message.message}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() =>
                                  updateMessageStatus(message.id, "READ")
                                }
                              >
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                                Mark Read
                              </Button>

                              <Button
                                size="sm"
                                variant="default"
                                className="cursor-pointer bg-green-500 hover:bg-green-600"
                                onClick={() =>
                                  updateMessageStatus(message.id, "REPLIED")
                                }
                              >
                                <Reply className="mr-1 h-4 w-4" />
                                Mark Replied
                              </Button>

                              <Button
                                size="sm"
                                variant="default"
                                className="cursor-pointer"
                                onClick={() =>
                                  updateMessageStatus(message.id, "ARCHIVED")
                                }
                              >
                                <Archive className="mr-1 h-4 w-4" />
                                Archive
                              </Button>

                              <a target="_blank"
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${message.email}&su=${encodeURIComponent(
                                  message.type
                                )}`}
                              >
                                <Button
                                  size="sm"
                                  className="cursor-pointer bg-[#76ABAE] hover:bg-[#5A8B8E]"
                                >
                                  <Mail className="mr-1 h-4 w-4" />
                                  Reply by Email
                                </Button>
                              </a>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

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
                              Delete message #{message.id}?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              This action cannot be undone. The message from{" "}
                              {message.email} will be permanently removed.
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
                                    `/api/messages/${message.id}`,
                                    {
                                      method: "DELETE",
                                    }
                                  );

                                  const data = await res.json();

                                  if (!res.ok) {
                                    toast.error(
                                      data.error || "Failed to delete message.",
                                      {
                                        position: "top-center",
                                      }
                                    );
                                    return;
                                  }

                                  toast.success(
                                    `Message #${message.id} deleted successfully.`,
                                    {
                                      position: "top-center",
                                    }
                                  );

                                  router.refresh();
                                }}
                              >
                                Delete Message
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {paginatedMessages.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-10 text-center text-gray-400"
                  >
                    No messages found.
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
      </AdminManagerLayout>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#222831] p-5 shadow-xl">
      <p className="text-sm text-[#EEEEEE]/50">{label}</p>
      <h3 className="mt-2 text-3xl font-bold text-[#76ABAE]">{value}</h3>
    </div>
  );
}