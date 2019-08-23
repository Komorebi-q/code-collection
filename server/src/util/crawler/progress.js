exports.renderProgressBar = (cur, total) => {
  const progressNumStr = ` ${cur}/${total}`;
  const ratio = cur / total;
  const numWidth = progressNumStr.length;
  const width = process.stdout.columns;
  const curWidth = parseInt((width - numWidth) * ratio, 10);
  const remainingWidth = width - numWidth - curWidth;
  const barStr = `${"#".repeat(curWidth)}${"-".repeat(remainingWidth)}`;

  process.stdout.write(`${barStr}${progressNumStr}`);
};
