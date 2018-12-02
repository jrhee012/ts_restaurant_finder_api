$(document).ready(function () {
    if ($("#pagination")) {
        var pagecount = locals.page.totalItems;
        var pagesize = locals.page.pageSize;
        var currentpage = locals.page.currentPage;
        var counts, pagehtml = "";
        if (pagecount % pagesize == 0) {
            counts = parseInt(pagecount / pagesize);
        } else {
            counts = parseInt(pagecount / pagesize) + 1;
        }
        //Only one page
        if (pagecount <= pagesize) { pagehtml = ""; }
        //More than one page content
        if (pagecount > pagesize) {
            if (currentpage > 1) {
                pagehtml += '<li><a href="/course/index/' + (currentpage - 1) + '">On one page</a></li>';
            }
            for (var i = 0; i < counts; i++) {
                if (i >= (currentpage - 3) && i < (currentpage + 3)) {
                    if (i == currentpage - 1) {
                        pagehtml += '<li class="active"><a href="/course/index/' + (i + 1) + '">' + (i + 1) + '</a></li>';
                    } else {
                        pagehtml += '<li><a href="/course/index/' + (i + 1) + '">' + (i + 1) + '</a></li>';
                    }

                }
            }
            if (currentpage < counts) {
                pagehtml += '<li><a href="/course/index/' + (currentpage + 1) + '">The next page</a></li>';
            }
        }
        $("#pagination").html(pagehtml);
    }
});