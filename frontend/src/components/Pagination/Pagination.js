import { NavLink, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import styles from './Pagination.module.css';

const Pagination = ({ numberOfResults, itemsPerPage, pageLimit }) => {
  const { search } = useLocation();
  const { attribute, order } = queryString.parse(search);

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
                search: `?${queryString.stringify({
                  attribute,
                  order,
                  page: number,
                })}`
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