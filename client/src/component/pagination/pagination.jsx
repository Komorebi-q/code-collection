import React from "react";
import "./style/pagination.scss";

function PaginationComp({
  current,
  totalPage,
  pageSizeOptions,
  itemRender,
  onChange,
  size
}) {
  const showSize = 5;

  const [state, setState] = React.useState({
    disabledPrev: false,
    disabledNext: false,
    showPrevOmit: false,
    showNextOmit: false
  });
  const [curs, setCurs] = React.useState([]);
  const [ellipsisState, setEll] = React.useState({ prev: false, next: false });

  React.useEffect(changeCurs, [totalPage, current]);

  function changeCurs() {
    const initState = {
      disabledPrev: false,
      disabledNext: false,
      showPrevOmit: false,
      showNextOmit: false
    };
    const initCurs = [];

    if (totalPage <= showSize) {
      // 1, 2, 3, 4, 5
      for (let i = 1; i <= totalPage; i++) {
        initCurs.push(i);
      }
    } else if (current >= showSize && current <= totalPage - showSize) {
      // 3, 4, 5(cur), 6, 7
      // 13, 14, 15(cur), 16, 17
      initState.showPrevOmit = true;
      initState.showNextOmit = true;

      for (let i = current - 2; i <= current + 2; i++) {
        initCurs.push(i);
      }
    } else if (current < showSize) {
      if (totalPage > showSize) {
        initState.showNextOmit = true;
      }

      for (let i = 1; i <= (totalPage < 5 ? totalPage : 5); i++) {
        initCurs.push(i);
      }
    } else if (totalPage - current < showSize) {
      initState.showPrevOmit = true;

      for (let i = totalPage - showSize; i <= totalPage; i++) {
        initCurs.push(i);
      }
    }

    if (current === 1) {
      initState.disabledPrev = true;
    }

    if (current === totalPage) {
      initState.disabledNext = true;
    }

    setCurs(initCurs);
    setState(initState);
    setEll({
      prev: false,
      next: false
    });
  }

  function handlePageChange(page) {
    onChange(page);
  }

  function go(step) {
    let page = current;

    if (step > 0) {
      if (current + step > totalPage) {
        page = totalPage;
      } else {
        page += step;
      }
    } else if (step < 0) {
      if (current + step < 1) {
        page = 1;
      } else {
        page += step;
      }
    }

    onChange(page);
  }

  return (
    <ul className="pagination-content">
      <li
        disabled={current === 1}
        className={`pagination-item ${
          current === 1 ? "pagination-item-disabled" : ""
        }`}
        onClick={go.bind(this, -1)}
      >
        <i className="iconfont icon-prev" />
      </li>

      {state.showPrevOmit ? (
        <>
          <li
            className="pagination-item"
            onClick={handlePageChange.bind(this, 1)}
          >
            1
          </li>
          <li
            className="pagination-item pagination-ellipsis"
            onClick={go.bind(this, -5)}
            onMouseEnter={() => {
              setEll({
                ...ellipsisState,
                prev: true
              });
            }}
            onMouseLeave={() => {
              setEll({
                ...ellipsisState,
                prev: false
              });
            }}
          >
            {ellipsisState.prev ? <i className="iconfont icon-prev" /> : "•••"}
          </li>
        </>
      ) : (
        ""
      )}

      {curs.map(page => (
        <li
          key={`pagination-${page}`}
          className={`pagination-item ${
            page === current ? "pagination-item-active" : ""
          }`}
          onClick={handlePageChange.bind(this, page)}
        >
          {page}
        </li>
      ))}

      {state.showNextOmit ? (
        <>
          <li
            className="pagination-item pagination-ellipsis"
            onClick={go.bind(this, 5)}
            onMouseEnter={() => {
              setEll({
                ...ellipsisState,
                next: true
              });
            }}
            onMouseLeave={() => {
              setEll({
                ...ellipsisState,
                next: false
              });
            }}
          >
            {ellipsisState.next ? <i className="iconfont icon-next" /> : "•••"}
          </li>
          <li
            className="pagination-item"
            onClick={handlePageChange.bind(this, totalPage)}
          >
            {totalPage}
          </li>
        </>
      ) : (
        ""
      )}

      <li
        disabled={current === totalPage}
        className={`pagination-item ${
          current === totalPage ? "pagination-item-disabled" : ""
        }`}
        onClick={go.bind(this, 1)}
      >
        <i className="iconfont icon-next" />
      </li>
    </ul>
  );
}

export default PaginationComp;
