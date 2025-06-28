import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Traxify Admin",
  description: "Traxify admin page",
};

export default function AdminHome() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="h-screen flex justify-center items-center">
        <div className="text-4xl">Coming Soon</div>
      </div>
    </div>
  );
}
