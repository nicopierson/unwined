import { NavLink } from 'react-router-dom';

import styles from './Pagination.module.css';

const Pagination = ({ count: numberOfResults, itemsPerPage, pageLimit }) => {
  let numberOfPages = Math.ceil(numberOfResults / itemsPerPage);
  if (numberOfPages > pageLimit) numberOfPages = pageLimit;

  const pageNumbers = [...Array(numberOfPages).keys()];

  return (
    <nav>
      <div className={styles.pagination}>
        {pageNumbers.map(number =>
            <NavLink
              to={`/wines/dashboard?page=${number}`}
              key={`page-${number}`}
              className={styles.page_link}
            >
              {number}
            </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Pagination;