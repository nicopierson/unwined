import { NavLink } from 'react-router-dom';

import styles from './Pagination.module.css';

const Pagination = ({ numberOfResults, itemsPerPage, pageLimit }) => {
  let numberOfPages = Math.ceil(numberOfResults / itemsPerPage);
  if (numberOfPages > pageLimit) numberOfPages = pageLimit;

  const pageNumbers = [...Array(numberOfPages).keys()];

  return (
    <nav>
      <div className={styles.pagination}>
        {pageNumbers.length > 0 && pageNumbers.map(number =>
            <NavLink
              to={{
                pathname: `/dashboard`,
                search: `?page=${number + 1}`
              }}
              key={`page-${number + 1}`}
              className={styles.page_link}
            >
              {number + 1}
            </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Pagination;