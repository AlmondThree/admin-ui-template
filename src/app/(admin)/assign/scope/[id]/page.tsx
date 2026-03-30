import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AssignScopeDetailsContent from "@/components/scope/AssignScopeDetailsContent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Traxify Admin",
  description:
    "Traxify admin page",
  // other metadata
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface ResDataScope {
    id_scope: string,
    scope_name: string,
    description: string,
    roles: string[],
  }

export default async function AssignScopeDetails({ params }: PageProps) {
  const { id } = await params;

  let resDataScope: ResDataScope | null = null

  //Fetch Data
  try{
    const apiCall = await fetch(
      `${process.env.NEXT_CURR_HOST}/api/scopes/${id}`,
      {
        method: "GET",
        headers: 
          {
            'Content-Type': 'application/json',
          }
      } 
    )

    if (apiCall.ok) {
      const res = await apiCall.json()

      const resData = res.data;

      resDataScope = {
        id_scope: resData.id_scope,
        scope_name: resData.scope_name,
        description: resData.description,
        roles: resData.roles,
      }

    }

  } catch (e) {
    console.log(e as string)
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Assign Scope" />
      <div className="space-y-6">
        <AssignScopeDetailsContent query={""} scopeData={resDataScope} />
      </div>
    </div>
  );
}
