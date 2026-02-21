import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TableLoadingSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Loading
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                <TableRow>
                    <TableCell>
                        <div className="flex-1 animate-pulse gap-2 p-10">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400" />      
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
