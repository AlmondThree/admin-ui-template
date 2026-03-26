import Loading from "@/app/loading";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AssignScopeContent from "@/components/scope/AssignScopeContent";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Traxify Admin",
  description:
    "Traxify admin page",
  // other metadata
};

export default async function Roles() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Assign Scope" />
      <div className="space-y-6">
        <Suspense fallback={<Loading />}>
          <AssignScopeContent query={""} />
        </Suspense>
      </div>
    </div>
  );
}
