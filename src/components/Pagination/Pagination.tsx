import { PaginationProps } from '../../typings';
import './Pagination.css';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

export default function Pagination({
  itemsPerPage,
  currentPage,
  lastIndex,
  total,
  setCurrentPage,
  handleItemsPerPageChange
}: PaginationProps) {
  // No need to render if nothing in the list
  if (total === 0) return;

  // Calculate number of total pages
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <section className="pagination">
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="btn">
        <span className="arrow" aria-hidden="true">&laquo; </span>Previous Page
      </button>
      <span><span className="audible-sm">Page</span> {currentPage} of {totalPages}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={lastIndex >= total} className="btn">
        Next Page<span className="arrow" aria-hidden="true"> &raquo;</span>
      </button>

      <div className="items-per-page-wrapper">
        <label htmlFor="items-per-page">Movies Per Page:</label>
        <div className="select">
          <select id="items-per-page" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(e.target.value)}>
            {ITEMS_PER_PAGE_OPTIONS.map(opt => (<option value={opt} key={opt}>{opt}</option>))}
          </select>
        </div>
      </div>
    </section>
  );
}