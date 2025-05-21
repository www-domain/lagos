import Pagination from "@mui/material/Pagination";

type Props = {
  maxPages: number;
  page: number;
  getCurrentPage: (page: number) => void;
}
const PaginationComponent = ({ maxPages, getCurrentPage, page }: Props) => {
  return (
    <>
      <Pagination
        count={maxPages}
        page={page}
        onChange={(event, page) => getCurrentPage(page)}
        size="small"
      />
    </>
  )
}

export default PaginationComponent
