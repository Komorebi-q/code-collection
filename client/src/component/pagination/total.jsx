import React from "react";

function PaginationTotal({ total, pageSize, pageSizeOptions, current }) {
  let curPageTotalStart = pageSize * (current - 1) + 1;
  let curPageTotalEnd = pageSize * current;

  return (
    <span>
      {curPageTotalStart}-{curPageTotalEnd} / {total}
    </span>
  );
}

export default PaginationTotal;
