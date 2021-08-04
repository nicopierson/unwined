import { NavLink, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import styles from './Pagination.module.css';

const Pagination = ({ numberOfResults, itemsPerPage, pageLimit }) => {
  const { search: searchString } = useLocation();
  let { attribute, order, search } = queryString.parse(searchString);
  if (!attribute) attribute = 'name';
  if (!order) order = 'desc'; 

  let numberOfPages = Math.ceil(numberOfResults / itemsPerPage);
  if (numberOfPages > pageLimit) numberOfPages = pageLimit;

  if (!numberOfPages) return null;
  const pageNumbers = [...Array(numberOfPages).keys()];

  return (
    <nav className={styles.pagination_container}>
      <div className={styles.pagination}>
        {pageNumbers.length > 1 && pageNumbers.map(number =>
            <NavLink
              to={{
                pathname: `/dashboard`,
                search: `?${queryString.stringify({
                  attribute,
                  order,
                  page: number + 1,
                  search,
                })}`
              }}
              isActive={(match, location) => {
                if (number + 1 === 1 && location.search === '') {
                  return true;
                }
                if ( location.search.match(`.+(&page=${number + 1})$`) 
                  || location.search.match(`.+&page=${number + 1}&search.+`) ) {
                    return true;
                }
                return false;
              }}
              activeStyle={{
                backgroundColor: '#672224',
                color: '#f5f5f5',
                borderRadius: '50px'
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