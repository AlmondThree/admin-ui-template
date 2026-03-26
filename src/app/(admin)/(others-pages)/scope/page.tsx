import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ScopeListContent from "@/components/scope/ScopeListContent";
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

export default async function Scopes({ searchParams }: PageProps) {

  const resolvedParams = await searchParams;
  
  const currentQuery = typeof resolvedParams.query === 'string' 
    ? resolvedParams.query 
    : '';

  return (
    <div>
      <PageBreadcrumb pageTitle="List Scope" />
      <div className="space-y-6">
        <ScopeListContent key={currentQuery} query={currentQuery}/>
      </div>
    </div>
  );
}
