import React from "react";
import Input from "./../form/input";

// todo replace input to component Input
function PaginationJumper({ totalPage, current, onChange }) {
  const jumpRef = React.createRef();
  function handleJump(e) {
    if (e.keyCode !== 13) {
      return;
    }

    let v = e.target.value;

    if (isNaN(Number(v)) || v == current) {
      jumpRef.current.value = "";

      return;
    }

    v = parseInt(v, 10);

    if (v < 1) {
      v = 1;
    }

    if (v > totalPage) {
      v = totalPage;
    }

    onChange(v);

    jumpRef.current.value = "";
  }

  return (
    <div className="pagination-jumper">
      jump to
      <Input size="small" />
      {/* <input
        className="k-input k-input-small"
        ref={jumpRef}
        onKeyDown={handleJump}
      /> */}
    </div>
  );
}

export default PaginationJumper;
