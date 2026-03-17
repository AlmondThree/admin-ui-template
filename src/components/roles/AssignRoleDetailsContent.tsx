"use client"

import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../tables/TableLoadingSkeleton";
import ComponentCard from "../common/ComponentCard";
import Pagination from "../tables/Pagination";
import DynamicTableRowAction, { ActionComponentProps } from "../tables/DynamicTableRowAction";
import { UserData } from "@/models/User";
import MiniComponentCard from "../common/MiniComponentCard";
import Button from "../ui/button/Button";
import { BoxIcon, ListIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import DynamicModal from "../modal/DynamicModal";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

type paginationPropsLogs = {
  currPage: number,
  totalPage: number,
  size: number
}

interface RolesListProp {
    query: string;
    userData: UserData | null;
}

interface dataRoles {
  id_role: string;
  role_name: string;
  description: string;
}

const ButtonCustom: React.FC<ActionComponentProps<dataRoles>> = ({ onClick }) => (
  <button onClick={onClick}>Delete</button>
);

const ButtonAddRoles: React.FC<ActionComponentProps<dataRoles>> = ({ onClick, isAdded }) => (
  <Button onClick={onClick} size="sm">
    {isAdded ? "Delete" : "Add"}    
  </Button>
);

const AssignRoleDetailsContent: React.FC<RolesListProp> = ({query, userData}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<dataRoles[]>([]);
  const [dataRoles, setDataRoles] = useState<dataRoles[]>([]);
  const [dataAddRoles, setDatAddaRoles] = useState<string[]>([]);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState('');
  const [addRoles, setAddRoles] = useState(true);
  const [pageInfo, setPageInfo] = useState<paginationPropsLogs>({
    currPage: 1,
    totalPage: 10,
    size: 10
  });

  const { isOpen, openModal, closeModal } = useModal(false);

  useEffect(() => {
    async function fetchData() {
      const apiCall = await fetch(
        `/api/roles?q=${query}&page=${pageInfo.currPage}&size=${pageInfo.size}`,
        {
          method: "GET",
          headers: 
            {
              'Content-Type': 'application/json',
            }
        }
      )

      if(apiCall.ok){
        const res = await apiCall.json();
        
        const rawData: dataRoles[] = res.data;

        let dataFinal: dataRoles[] = [];
        let dataRolesList: dataRoles[] = [];

        for(let item of rawData) {
          if(userData?.roles.includes( item.role_name)) {
            dataFinal.push(item)
          } else {
            dataRolesList.push(item)
          }
        }
 
        setData(dataFinal);
        setDataRoles(dataRolesList);
        setPageInfo({
          ...pageInfo,
          totalPage:res.pages.last_page
        })
        setFetchStatus(true);
      }
    }

    fetchData();

  }, [pageInfo.currPage])

  useEffect(() => {
    setAddRoles(isOpen);
  }, [isOpen])

  const onPageChange = (pageNumber: number) => {
    setPageInfo({...pageInfo, currPage: pageNumber})
  }

  const addRolesData = async (data: dataRoles) => {
    await setDatAddaRoles(prev => 
      prev.includes(data.id_role) ? prev.filter(i => i !== data.id_role) : [...prev, data.id_role]
    );
  }

  const pushAddRoles = async () => {
    closeModal();
    setIsLoading(true);

    const reqPayload = {
      userId: userData?.id,
      roleId: dataAddRoles
    }

    const apiCall = await fetch(
      `/api/user/roles`,
      {
        method: "POST",
        headers: 
          {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(reqPayload)
      }
    )

    if(apiCall.ok) {
      setIsLoading(false)
      alert("Success add roles!");
      window.location.href = `/assign/roles/${userData?.id}`;
    } else {
      setIsLoading(false)
      alert("Error assign roles");
    }

  }

  return(
    <div className="grid grid-cols-1 gap-4">
      {isLoading && <Loading /> }
        <ComponentCard title={"Detail User"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <MiniComponentCard title={"Username"} description={userData!.userName} />
            <MiniComponentCard title={"Email"} description={userData!.email} />
            <MiniComponentCard title={"First Name"} description={userData!.firstName} />
            <MiniComponentCard title={"Last Name"} description={userData!.lastName} />
            <MiniComponentCard title={"Employee Id"} description={userData!.employeeId} />
          </div>
        </ComponentCard>
        <ComponentCard title="Roles">
          <div className="grid grid-cols-2">
            <div className="flex items-center">
              <p className="text-m text-gray-600">Current Existing Roles:</p>
            </div>
            <div className="flex justify-end pr-[3%]"> 
              <Button size="sm" variant="primary" startIcon={<ListIcon />} onClick={() => openModal()}>
                Add Roles
              </Button>
            </div>
          </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                  {
                      (fetchStatus) ? (
                      <DynamicTableRowAction<dataRoles>
                        data={data} 
                        columns={[
                          {header: 'Role Id', key: 'id_role'},
                          {header: 'Role Name', key: 'role_name'},
                          {header: 'Description', key: 'description'}
                        ]} 
                        ActionComponent={ButtonCustom} 
                        actionComponentClassName={""}
                        onActionClick={(data) => {
                          setSelectedRoles(data.role_name);
                          alert("This featur is not available in current version!")
                        }}
                      />
                      ) : (
                      <TableLoadingSkeleton
                      />
                      )
                      
                  }
              </div>
            </div>
          <Pagination currentPage={pageInfo.currPage} totalPages={pageInfo.totalPage} onPageChange={onPageChange}/>
          {addRoles && <DynamicModal key={selectedRoles} modalProps={{
              isOpen,
              openModal,
              closeModal
            }}>
              
                <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                  {"Add Roles"}
                </h4>
                {
                  (fetchStatus) ? (
                    <DynamicTableRowAction<dataRoles>
                      data={dataRoles} 
                      columns={[
                        {header: 'Role Id', key: 'id_role'},
                        {header: 'Role Name', key: 'role_name'},
                        {header: 'Description', key: 'description'}
                      ]} 
                      ActionComponent={ButtonAddRoles} 
                      actionComponentClassName={""}
                      addedIds={dataAddRoles}
                      onActionClick={(data) => (addRolesData(data))}
                    />
                    ) : (
                    <TableLoadingSkeleton
                    />
                    )   
                  }

                <div className="flex items-center justify-end w-full gap-3 mt-6">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Close
                  </Button>
                  <Button size="sm" onClick={() => (pushAddRoles())}>
                    Save Changes
                  </Button>
                </div>
              
          </DynamicModal>}
        </ComponentCard>
    </div>
    
  )
}

export default AssignRoleDetailsContent;