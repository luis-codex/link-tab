interface PaginationParams {
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
}

export interface PaginationReturns {
    pages: number;
    currentPageSlice: { start: number, end: number };
    currentPage: number;
    countCurrentPage: number;
    totalItemsOnPages: number;
}

/** Valores de error */
export const errorValues = {
    pages: 0, currentPageSlice: { start: 0, end: 0 }, currentPage: 0, countCurrentPage: 0,
    totalItemsOnPages: 0,
};

/**
 * @param itemsPerPage Cantidad de items por página
 * @param currentPage Página actual
 * @param totalItems Cantidad total de items
 * @returns { pages: number, currentPageSlice: { start: number, end: number }, currentPage: number, countCurrentPage: number }
 */
export function pagination({ itemsPerPage, currentPage, totalItems }: PaginationParams): PaginationReturns {
    /** Valida que los parámetros no sean menores o iguales a 0 */
    if (itemsPerPage <= 0 || totalItems <= 0) {
        return errorValues;
    }

    const pages = Math.ceil(totalItems / itemsPerPage);

    /** Valida que la página no sea menor a 1 o mayor a las páginas */
    const activePage = currentPage <= 0 ? 1 : currentPage > pages ? pages : currentPage;
    const start = (activePage - 1) * itemsPerPage;
    const end = Math.min(activePage * itemsPerPage, totalItems);

    return {
        pages, currentPageSlice: { start, end }, currentPage: activePage, countCurrentPage: end - start, totalItemsOnPages: totalItems,
    };
}

