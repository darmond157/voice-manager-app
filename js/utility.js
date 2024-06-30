function newPaginate(all_of_any, count, selector_class, functionEnter, use_count) {
    if (all_of_any == 0) {
        $('.pagination').addClass("d-none").hide();
    } else {
        $('.pagination').removeClass("d-none").show();
        let numOfPage = Math.ceil(all_of_any / count);
        let element = $('.' + selector_class).find('.box-paginate');
        let firstPageClick = false;
        $('.row-paginate').show();
        let defaultOpts = {
            totalPages: numOfPage,
            visiblePages: 7,
            onPageClick: function (evt, page) {
                if (firstPageClick) {
                    if (use_count) {
                        functionEnter(page, count);
                    } else {
                        functionEnter(page);
                    }
                }
                firstPageClick = true;
            },
            first: '<i class="icon-chevron-right"></i>',//<i class="fa fa-step-forward"></i>
            prev: '',//<i class="fa fa-chevron-right"></i>
            next: '',//<i class="fa fa-chevron-left"></i>
            last: '<i class="icon-chevron-left"></i>' //<i class="fa fa-step-backward"></i>
        };
        $(element).find('.title-of-pagination numberofpage').text(numOfPage);
        if (!firstPageClick) {
            let currentPage = $(element).find('ul').twbsPagination('getCurrentPage');
            if (currentPage > numOfPage) {
                currentPage = numOfPage;
            }
            $(element).find('ul').twbsPagination('destroy');
            $(element).find('ul').twbsPagination(
                $.extend({}, defaultOpts, {
                    startPage: currentPage,
                    totalPages: numOfPage
                })
            );
        } else {
            $(element).find('ul').twbsPagination(defaultOpts);
        }
    }
}
