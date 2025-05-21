import React from "react";
import { FolderSearch } from "lucide-react";
import TableSkeleton from "./ui/table-skeleton";

interface Column {
  label: React.ReactNode; // JSX for column headers
  key: (record: any) => React.ReactNode; // Function for rendering row data
}

interface TableProps {
  columns: Column[];
  data: any[];
  serials?: number[];
  renderActions?: (record: any) => React.ReactNode;
  isEmpty?: boolean;
  loading?: boolean;
  emptyMessage?: React.ReactNode;
}

const ReusableTable: React.FC<TableProps> = ({
  columns,
  data,
  serials,
  renderActions,
  isEmpty = false,
  loading = false,
  emptyMessage = (
    <div className="text-center text-slate-500">
      <div className="flex flex-col items-center py-6">
        <FolderSearch className="w-16 h-16 mb-4 text-gray-300" />
        <p className="text-gray-400 text-sm">No records available.</p>
      </div>
    </div>
  ),
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-gray-700">
        {/* Table Head */}
        <thead className="bg-gray-100 text-[#107BC0] font-medium uppercase text-xs">
          <tr>
            {serials && <th className="px-4 py-3 text-left">S/No.</th>}
            {columns.map((column, idx) => (
              <th key={idx} className="px-4 py-3 text-left">{column.label}</th>
            ))}
            {renderActions && (
              <th className="px-4 py-3 text-center">Actions</th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200 bg-white">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (serials ? 1 : 0) + (renderActions ? 1 : 0)}
                className="py-4 text-center px-2"
              >
                <TableSkeleton />
              </td>
            </tr>
          ) : isEmpty ? (
            <tr>
              <td
                colSpan={columns.length + (serials ? 1 : 0) + (renderActions ? 1 : 0)}
                className="py-6 text-center"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((record, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-150"
              >
                {serials && (
                  <td className="px-4 py-3 text-gray-600">{serials[idx]}</td>
                )}
                {columns.map((column, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">{column.key(record)}</td>
                ))}
                {renderActions && (
                  <td className="px-4 py-3 text-center">{renderActions(record)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
