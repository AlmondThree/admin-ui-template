"use client"

import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../tables/TableLoadingSkeleton";
import ComponentCard from "../common/ComponentCard";
import Pagination from "../tables/Pagination";
import DefaultSearchBar from "../search/DefaultSearchBar";
import DynamicTableRowAction, { ActionComponentProps } from "../tables/DynamicTableRowAction";
import { useModal } from "@/hooks/useModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading";
import Button from "../ui/button/Button";

type paginationPropsLogs = {
  currPage: number,
  totalPage: number,
  size: number
}

interface RolesListProp {
    query: string;
}

interface dataScope {
  id_scope: string;
  scope_name: string;
  description: string
}

const ButtonCustom: React.FC<ActionComponentProps<dataScope>> = ({ onClick }) => (
  <Button onClick={onClick} size="sm">
    Select
  </Button>

);

const AssignScopeContent: React.FC<RolesListProp> = ({query}) => {
  const [data, setData] = useState<dataScope[]>([]);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedScope, setSelectedScope] = useState('');
  const [pageInfo, setPageInfo] = useState<paginationPropsLogs>({
    currPage: 1,
    totalPage: 10,
    size: 5
  });

  const { isOpen, openModal, closeModal } = useModal(true);

  const selectScope = ( scopeId:string ) => {
    setSelectedScope(scopeId);
    openModal();
  }

  const onPageChange = (pageNumber: number) => {
    setPageInfo({...pageInfo, currPage: pageNumber})
  }

  const router = useRouter();

  const redirectDetails = () => {
    closeModal();
    setIsLoading(true);
    router.push(`/assign/scope/${selectedScope}`)
  }

  const { currPage, size } = pageInfo;

  useEffect(() => {
    async function fetchData() {
      const apiCall = await fetch(
        `/api/scopes?q=${query}&page=${currPage}&size=${size}`,
        {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (apiCall.ok) {
        const res = await apiCall.json();
        
        setData(res.data);
        
        setPageInfo(prev => ({
          ...prev,
          totalPage: res.pages.last_page
        }));
        
        setFetchStatus(true);
      }
    }

    fetchData();

  }, [currPage, size, query]);

  return(
    
    <div className="grid grid-cols-1 gap-4">
        {isLoading && <Loading />}
        {selectedScope != '' && <ConfirmationModal key={selectedScope} text={"Are you sure you want to make changes to this scope?"} onAction={() => redirectDetails()} modalProps={{
          isOpen,
          openModal,
          closeModal
        }} confirmationText={"Assign scope roles"}/>}
        <ComponentCard title={"Search Scope"}> 
          <DefaultSearchBar/>
        </ComponentCard>        
        <ComponentCard title="Scope">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                  {
                    (fetchStatus) ? (
                      <DynamicTableRowAction<dataScope>
                        data={data} 
                        columns={[
                          {header: 'Id Scope', key: 'id_scope'},
                          {header: 'Scope Name', key: 'scope_name'},
                          {header: 'Description', key: 'description'}
                        ]} 
                        ActionComponent={ButtonCustom} 
                        actionComponentClassName={""}
                        onActionClick={(data) => selectScope(data.id_scope)}
                      />
                      ) : (
                      <TableLoadingSkeleton
                      />
                    )   
                  }
              </div>
            </div>
            <Pagination currentPage={pageInfo.currPage} totalPages={pageInfo.totalPage} onPageChange={onPageChange}/>
        
        </ComponentCard>
    </div>
    
  )
}

export default AssignScopeContent;