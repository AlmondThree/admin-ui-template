import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RolesListContent from "@/components/roles/RolesListContent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Traxify Admin",
  description:
    "Traxify admin page",
  // other metadata
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Roles({ searchParams }: PageProps) {

  const resolvedParams = await searchParams;
  
  const currentQuery = typeof resolvedParams.query === 'string' 
    ? resolvedParams.query 
    : '';

  return (
    <div>
      <PageBreadcrumb pageTitle="List Roles" />
      <div className="space-y-6">
        <RolesListContent key={currentQuery} query={currentQuery}/>
      </div>
    </div>
  );
}
