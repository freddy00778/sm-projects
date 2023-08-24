import React, { useState } from "react";
import { DataType } from "../../types";
import "../Table.css";

export interface TableProps {
    headings: any[];
    data: any[];
    onEdit?: (data: DataType) => void;
    onDelete?: (data: DataType) => void;
    addData?: (data: DataType) => void;
    className?: string;
    children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({
                                         headings,
                                         data,
                                         className,
                                         children,
                                     }) => {
    const itemsPerPage = 10; // Number of rows per page
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = data?.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const handleEdit = (row) => {
        console.log("Edit", row);
        // Here you might want to navigate to an edit page or open a modal to edit the item.
        // Or you can call a parent component's edit handler if passed down as a prop.
    };

    const handleDelete = (row) => {
        console.log("Delete", row);
        // Here you can handle the delete logic.
        // This can be done locally or via an API call to delete from a database.
        // You can also call a parent component's delete handler if passed down as a prop.
    };


    return (
        <div className={`table-container ${className}`}>
            <div className="header">
                <div className="row">
                    {headings?.map((heading, index) => (
                        <div key={index} className="cell">
                            {heading.alias}
                        </div>
                    ))}
                </div>
            </div>
            <div className="content">
                {currentData?.length === 0 ? (
                    <div className="empty-content">
                        {children}
                    </div>
                ) : (
                    currentData?.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {headings?.map((heading, index) => (
                                <div key={index} className="cell">
                                    {heading.alias === "Date Logged" || heading.alias?.includes("Date")
                                        ? new Date(row[heading?.name]).toLocaleDateString()
                                        :  row[heading?.name]}
                                </div>
                            ))}
                            <div className="actions">
                                <button onClick={() => handleEdit(row)}>Edit</button>
                                <button onClick={() => handleDelete(row)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
