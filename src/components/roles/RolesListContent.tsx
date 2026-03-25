"use client"

import { useEffect, useState } from "react";
import BasicTableDynamic from "../tables/BasicTableDynamic";
import TableLoadingSkeleton from "../tables/TableLoadingSkeleton";
import ComponentCard from "../common/ComponentCard";
import Pagination from "../tables/Pagination";
import DefaultSearchBar from "../search/DefaultSearchBar";

type paginationPropsLogs = {
  currPage: number,
  totalPage: number,
  size: number
}

interface RolesListProp {
    query: string;
}

const RolesListContent: React.FC<RolesListProp> = ({query}) => {
  const [data, setData] = useState<Record<string, unknown>[]>([{}]);
  const [listHeaders, setListHeaders] = useState<string[]>([]);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<paginationPropsLogs>({
    currPage: 1,
    totalPage: 10,
    size: 5
  });

  const onPageChange = (pageNumber: number) => {
    setPageInfo({...pageInfo, currPage: pageNumber})
  }

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
        
        setData(res.data);

        setPageInfo(prev => ({
          ...prev,
          totalPage: res.pages.last_page
        }));

        setFetchStatus(true);
      }
    }

    const headers = ["Role Id", "Roles Name", "Description"];
    setListHeaders(headers);

    fetchData();

  }, [currPage, size, query, setData, setListHeaders]);

  return(
    <div className="grid grid-cols-1 gap-4">
        <ComponentCard title={"Search Role"}> 
          <DefaultSearchBar/>
        </ComponentCard>

        <ComponentCard title="Roles">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                {
                    (fetchStatus) ? (
                    <BasicTableDynamic 
                        headers={listHeaders!}
                        data={data!}
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

export default RolesListContent;