import React from 'react'
import Image from "next/image"


interface TableCellImageProps {
    imageLink: string
    altText: string
    index: number
}

const TableCellImage: React.FC<TableCellImageProps> = ({ index, imageLink, altText }) => {

    return (
        <td key={`${index}-${altText}`} className="ArticalText" ><Image src={imageLink} alt={altText} width={150} height={50} /></td>
    );
}
export default TableCellImage;

