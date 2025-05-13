import React from "react";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Pagination = ({
  totalPage,
  page,
  setPage,
}: {
  totalPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };


  

  return (
    <div className="my-2">
      <PaginationRoot>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              className={`transition-all ${
                page <= 1
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-muted hover:text-primary"
              }`}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {[...Array(totalPage)].map((_, index) => {
            const pageNumber = index + 1;
            const isActive = page === pageNumber;

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={isActive}
                  className={`transition-all duration-200 rounded-md px-3 py-1 ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "hover:bg-muted hover:text-primary"
                  }`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className={`transition-all ${
                page >= totalPage
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-muted hover:text-primary"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    </div>
  );
};

export default Pagination;
