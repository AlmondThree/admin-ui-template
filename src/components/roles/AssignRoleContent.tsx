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

interface dataUser {
  userId: string;
  username: string;
  employeeId: string
}

const ButtonCustom: React.FC<ActionComponentProps<dataUser>> = ({ onClick }) => (
  <Button onClick={onClick} size="sm">
    Select
  </Button>

);

const AssignRoleContent: React.FC<RolesListProp> = ({query}) => {
  const [data, setData] = useState<dataUser[]>([]);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [pageInfo, setPageInfo] = useState<paginationPropsLogs>({
    currPage: 1,
    totalPage: 10,
    size: 5
  });

  const { isOpen, openModal, closeModal } = useModal(true);

  const selectUser = ( userId:string ) => {
    setSelectedUser(userId);
    openModal();
  }

  const onPageChange = (pageNumber: number) => {
    setPageInfo({...pageInfo, currPage: pageNumber})
  }

  const router = useRouter();

  const redirectDetails = () => {
    closeModal();
    setIsLoading(true);
    router.push(`/assign/roles/${selectedUser}`)
  }

  useEffect(() => {
    async function fetchData() {
      const apiCall = await fetch(
        `/api/user/list?q=${query}&page=${pageInfo.currPage}&size=${pageInfo.size}`,
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
        
        setData(res.data);
        setPageInfo({
          ...pageInfo,
          totalPage:res.pages.last_page
        })
        setFetchStatus(true);
      }
    }

    fetchData();

  }, [pageInfo.currPage])

  return(
    
    <div className="grid grid-cols-1 gap-4">
        {isLoading && <Loading />}
        {selectedUser != '' && <ConfirmationModal key={selectedUser} text={"Are you sure you want to make changes to this user's information?"} onAction={() => redirectDetails()} modalProps={{
          isOpen,
          openModal,
          closeModal
        }} confirmationText={"Assign role user"}/>}
        <ComponentCard title={"Search User"} children={<DefaultSearchBar/>} />        
        <ComponentCard title="Users">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                  {
                    (fetchStatus) ? (
                      <DynamicTableRowAction<dataUser>
                        data={data} 
                        columns={[
                          {header: 'User Id', key: 'userId'},
                          {header: 'Username', key: 'username'},
                          {header: 'Employee Id', key: 'employeeId'}
                        ]} 
                        ActionComponent={ButtonCustom} 
                        actionComponentClassName={""}
                        onActionClick={(data) => selectUser(data.userId)}
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

export default AssignRoleContent;