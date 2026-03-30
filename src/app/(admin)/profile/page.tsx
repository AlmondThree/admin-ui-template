import Loading from "@/app/loading";
import UserInfoCardCustom from "@/components/user-profile/UserInfoCardCustom";
import UserMetaCardCustom from "@/components/user-profile/UserMetaCardCustom";
import { Token } from "@/models/Token";
import { UserData } from "@/models/User";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Traxify Admin",
  description: "Traxify admin Profile Page",
};

export default async function Profile() {

  const cookieStore = await cookies();

  const tokenObj = new Token(cookieStore.get('access_token')?.value);

  const userId = await tokenObj.getUserId();

  const res = await fetch(
    `${process.env["NEXT_PUBLIC_BACKEND_HOST_AUTH"]}/api/auth/v1/users/${userId}`,
    {
      method: "GET",
      headers: 
      {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env["NEXT_PUBLIC_API_KEY_AUTH"]}`
      },
    }
  )

  let data: UserData = {
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    roles: []
  }

  if(res.ok) {
    const responseAPI = await res.json();
    data = {
      id: responseAPI.data[0].id,
      userName: responseAPI.data[0].username,
      firstName: responseAPI.data[0].firstName,
      lastName: responseAPI.data[0].lastName,
      email: responseAPI.data[0].email,
      employeeId: responseAPI.data[0].employeeId,
      roles: responseAPI.data[0].roles
    }
  }

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <Suspense fallback={<Loading />}>
          <div className="space-y-6">
            <UserMetaCardCustom 
              userId={data.id} 
              firstName={data.firstName} 
              lastName={data.lastName} 
              email={data.email} 
              employeeId={data.employeeId} 
              roles={data.roles}
            />
            <UserInfoCardCustom
              userId={data.id} 
              firstName={data.firstName} 
              lastName={data.lastName} 
              email={data.email} 
              employeeId={data.employeeId} 
              roles={data.roles}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
