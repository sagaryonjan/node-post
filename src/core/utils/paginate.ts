import {
  DEFAULT_PAGE,
  DEFAULT_SIZE,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_DIRECTION
} from '../constants/paginate';

export interface PageParams {
  page: number;
  pageSize: number;
}

interface SortParams {
  field: string;
  direction: string;
}

/**
 * Page params.
 *
 * @param query any
 */
export function getPageParams(query: any): PageParams {
  const page: number = DEFAULT_PAGE;
  const pageSize: number = DEFAULT_SIZE;

  return {
    page: Number(query.page) || page,
    pageSize: Number(query.pageSize) || pageSize
  };
}

/**
 * Sort params
 *
 * @param query any
 * @param sortField string
 * @param sortDirection string
 */
export function getSortParams(
  query: any,
  sortField: string = DEFAULT_SORT_FIELD,
  sortDirection: string = DEFAULT_SORT_DIRECTION
): SortParams {
  return {
    field: query.sortField || sortField,
    direction: query.sortDirection || sortDirection
  };
}

/**
 * Paginate Data
 *
 * @param data any
 * @param pageParams any
 * @param total number
 */
export function paginateData(data: any, pageParams: any, total: number) {
  const lastPage = Math.max(Math.ceil(total / pageParams.pageSize), 1);
  const hasNextPage = pageParams.page < lastPage;

  return {
    data,
    total,
    hasNextPage,
    ...pageParams
  };
}
