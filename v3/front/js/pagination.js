


const renderPagination = async () => {
    // pageCount - забираємо з LS
    // у LS  даний параметр сетиться у getAndShowAllProducts();
    const pageCount = getPageCount();
    const currentPage = getPage() || 1 ;
    const ul = document.getElementById('pagination');
    ul.style.display = 'flex';
    ul.innerHTML = `   
        <li class="page-item" id="previous-page">
            <span class="page-link"  onclick='changePage(${currentPage-1})' aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </span>
        </li>
        <li class="page-item" id="previous-exist-page" ><span class="page-link"  onclick='changePage(${currentPage-1})'>${currentPage-1}</span></li>
        <li class="page-item active"><span class="page-link"  id="current-page">${currentPage}</span></li>
        <li class="page-item" id="next-exist-page"><span class="page-link"  onclick='changePage(${currentPage+1})'>${currentPage+1}</span></li>
        <li class="page-item" id="next-page">
            <span class="page-link"  onclick='changePage(${currentPage+1})' aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </span>
        </li>`;
    
    if (currentPage === 1) {
        document.getElementById('previous-page').classList.add('disabled');
        document.getElementById('previous-exist-page').style.display = 'none';
    }
    if (currentPage === pageCount) {
        document.getElementById('next-page').classList.add('disabled');
        document.getElementById('next-exist-page').style.display = 'none';
    }
    if ( pageCount === 1 ) {
        ul.style.display = 'none';
    }
}

const changePage = async (page) => {
    // Сетимо в LS номер поточної сторінки
    await setPage(page);
    await getAndShowAllProducts();
}



