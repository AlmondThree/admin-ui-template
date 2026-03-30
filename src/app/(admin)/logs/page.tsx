import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LogsTable from "@/components/logs/LogsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Traxify Admin",
  description:
    "Traxify admin page",
  // other metadata
};

export default function Logs() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Logs" />
      <div className="space-y-6">
        <LogsTable />
      </div>
    </div>
  );
}
