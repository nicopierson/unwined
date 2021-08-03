import { NavLink, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import styles from './Pagination.module.css';

const Pagination = ({ numberOfResults, itemsPerPage, pageLimit }) => {
  const { search } = useLocation();
  let { attribute, order } = queryString.parse(search);
  if (!attribute) attribute = 'name';
  if (!order) order = 'desc'; 

  let numberOfPages = Math.ceil(numberOfResults / itemsPerPage);
  if (numberOfPages > pageLimit) numberOfPages = pageLimit;

  if (!numberOfPages) return null;
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
                  page: number + 1,
                })}`
              }}
              isActive={(match, location) => {
                if (number + 1 === 1 && location.search === '') {
                  return true;
                }
                if ( !location.search.match(`.+(&\\w+=${number + 1})$`) ||
                  !location.search.match(`.+(&\\w+=${number + 1})&search`) ) {
                    return false;
                }
                return true;
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