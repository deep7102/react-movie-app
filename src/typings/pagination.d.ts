export interface PaginationProps {
  itemsPerPage: number;
  currentPage: number;
  lastIndex: number;
  total: number;
  setCurrentPage: (num: number) => void;
  handleItemsPerPageChange: (val: string) => void;
}
