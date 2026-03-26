"use client"

import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../tables/TableLoadingSkeleton";
import ComponentCard from "../common/ComponentCard";
import Pagination from "../tables/Pagination";
import DynamicTableRowAction, { ActionComponentProps } from "../tables/DynamicTableRowAction";
import MiniComponentCard from "../common/MiniComponentCard";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import DynamicModal from "../modal/DynamicModal";
import Loading from "@/app/loading";
import { ListIcon } from "@/icons";
import { ResDataScope } from "@/app/(admin)/(others-pages)/assign/scope/[id]/page";

type paginationPropsLogs = {
  currPage: number,
  totalPage: number,
  size: number
}

interface ScopeListProp {
    query: string;
    scopeData: ResDataScope | null;
}

interface DataRoles {
  id_role: string;
  role_name: string;
  description: string;
}

const ButtonCustom: React.FC<ActionComponentProps<DataRoles>> = ({ onClick }) => (
  <button onClick={onClick}>Delete</button>
);

const ButtonAddRoles: React.FC<ActionComponentProps<DataRoles>> = ({ onClick, isAdded }) => (
  <Button onClick={onClick} size="sm">
    {isAdded ? "Delete" : "Add"}    
  </Button>
);

const AssignRoleDetailsContent: React.FC<ScopeListProp> = ({query, scopeData}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DataRoles[]>([]);
  const [dataScope, setDataScope] = useState<DataRoles[]>([]);
  const [dataAddScope, setDatAddaScope] = useState<string[]>([]);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [selectedScope, setSelectedScope] = useState('');
  const [addScope, setAddScope] = useState(true);
  const [pageInfo, setPageInfo] = useState<paginationPropsLogs>({
    currPage: 1,
    totalPage: 10,
    size: 10
  });

  const { isOpen, openModal, closeModal } = useModal(false);

  const { currPage, size } = pageInfo;

  useEffect(() => {
    async function fetchData() {
      
      const apiCall = await fetch(
        `/api/roles?q=${query}&page=${currPage}&size=${size}`,
        {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (apiCall.ok) {
        const res = await apiCall.json();
        const rawData: DataRoles[] = res.data;

        const dataFinal: DataRoles[] = [];
        const dataScopeList: DataRoles[] = [];

        for (const item of rawData) {
          if (scopeData?.roles.includes(item.role_name)) {
            dataFinal.push(item);
          } else {
            dataScopeList.push(item);
          }
        }

        setData(dataFinal);
        setDataScope(dataScopeList);

        setPageInfo(prev => ({
          ...prev,
          totalPage: res.pages.last_page
        }));

        setFetchStatus(true);
      }
    }

    fetchData();

  }, [currPage, size, query, scopeData, setData, setDataScope]);

  useEffect(() => {
    setAddScope(isOpen);
  }, [isOpen])

  const onPageChange = (pageNumber: number) => {
    setPageInfo({...pageInfo, currPage: pageNumber})
  }

  const addRolesData = async (data: DataRoles) => {
    await setDatAddaScope(prev => 
      prev.includes(data.id_role) ? prev.filter(i => i !== data.id_role) : [...prev, data.id_role]
    );
  }

  const pushAddRoles = async () => {
    closeModal();
    setIsLoading(true);

    const reqPayload = {
      scopeId: scopeData?.id_scope,
      roleId: dataAddScope
    }

    console.log(reqPayload);

    const apiCall = await fetch(
      `/api/roles/scope`,
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
      window.location.href = `/assign/scope/${scopeData?.id_scope}`;
    } else {
      setIsLoading(false)
      alert("Error assign roles");
    }

  }

  return(
    <div className="grid grid-cols-1 gap-4">
      {isLoading && <Loading /> }
        <ComponentCard title={"Detail User"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MiniComponentCard title={"Id Scope"} description={scopeData!.id_scope} />
            <MiniComponentCard title={"Scope Name"} description={scopeData!.scope_name} />
            <MiniComponentCard title={"Description"} description={scopeData!.description} />
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
                      <DynamicTableRowAction<DataRoles>
                        data={data} 
                        columns={[
                          {header: 'Scope Id', key: 'id_role'},
                          {header: 'Scope Name', key: 'role_name'},
                          {header: 'Description', key: 'description'}
                        ]} 
                        ActionComponent={ButtonCustom} 
                        actionComponentClassName={""}
                        onActionClick={(data) => {
                          setSelectedScope(data.role_name);
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
          {addScope && <DynamicModal key={selectedScope} modalProps={{
              isOpen,
              openModal,
              closeModal
            }}>
              
                <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                  {"Add Roles"}
                </h4>
                {
                  (fetchStatus) ? (
                    <DynamicTableRowAction<DataRoles>
                      data={dataScope} 
                      columns={[
                        {header: 'Scope Id', key: 'id_role'},
                        {header: 'Scope Name', key: 'role_name'},
                        {header: 'Description', key: 'description'}
                      ]} 
                      ActionComponent={ButtonAddRoles} 
                      actionComponentClassName={""}
                      addedIds={dataAddScope}
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