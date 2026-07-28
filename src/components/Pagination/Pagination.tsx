import ReactPaginateModule from 'react-paginate';
import css from './Pagination.module.css';

interface ReactPaginateModuleShape {
  default?: React.ComponentType<Record<string, unknown>>;
}

const ReactPaginate = (ReactPaginateModule as ReactPaginateModuleShape).default || ReactPaginateModule;

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
}

export default function Pagination({ pageCount, onPageChange, forcePage }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={forcePage}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      disabledClassName={css.disabled}
      breakClassName={css.break}
      previousLabel="<"
      nextLabel=">"
    />
  );
}
