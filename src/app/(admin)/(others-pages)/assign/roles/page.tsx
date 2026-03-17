import Loading from "@/app/loading";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AssignRoleContent from "@/components/roles/AssignRoleContent";
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
      <PageBreadcrumb pageTitle="Assign Roles" />
      <div className="space-y-6">
        <Suspense fallback={<Loading />}>
          <AssignRoleContent query={""} />
        </Suspense>
      </div>
    </div>
  );
}
