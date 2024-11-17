import React from "react";
import { Pagination } from "@mui/material";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function PaginationControl({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlProps) {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      color="primary"
    />
  );
}
