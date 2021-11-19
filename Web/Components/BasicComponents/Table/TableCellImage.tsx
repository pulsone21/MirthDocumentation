import React from 'react'
import Image from "next/image"


interface TableCellImageProps {
    imageLink: string
    altText: string
}

const TableCellImage: React.FC<TableCellImageProps> = ({ imageLink, altText }) => {
    return (
        <td><Image src={imageLink} alt={altText} width={150} height={50} /></td>
    );
}
export default TableCellImage;

