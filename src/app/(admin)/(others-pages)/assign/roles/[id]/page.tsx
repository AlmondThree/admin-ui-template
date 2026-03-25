import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AssignRoleDetailsContent from "@/components/roles/AssignRoleDetailsContent";
import { UserData } from "@/models/User";
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

export default async function AssignRolesDetails({ params }: PageProps) {
  const { id } = await params;

  let resDataUser : UserData | null = null

  //Fetch Data
  try{
    const apiCall = await fetch(
      `${process.env.NEXT_CURR_HOST}/api/user/${id}`,
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
      
      resDataUser = {
        id: resData[0].id,
        userName: resData[0].username,
        firstName: resData[0].firstName,
        lastName: resData[0].lastName,
        email: resData[0].email,
        employeeId: resData[0].employeeId,
        roles: resData[0].roles
      }

    }

  } catch (e) {
    console.log(e as string)
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Assign Roles" />
      <div className="space-y-6">
        <AssignRoleDetailsContent query={""} userData={resDataUser} />
      </div>
    </div>
  );
}
