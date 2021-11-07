//@ts-nocheck
import React, { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { acceptStyle, activeStyle, baseStyle, rejectStyle } from './DropZoneStyle';
import BasicButton from '../Button/BasicButton';


interface DropZoneProps {
    formikHandler: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const DropZone: React.FC<DropZoneProps> = ({ formikHandler }) => {
    const [path, setPath] = useState("")
    const [preview, setPreview] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setPath(URL.createObjectURL(acceptedFiles[0]))
        setPreview(true)
        formikHandler("logo", acceptedFiles[0])
    }, [formikHandler])

    const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } = useDropzone({
        accept: "image/jpeg , image/png",
        maxFiles: 1,
        onDrop,
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    const handleDeleteImg = () => {
        setPreview(false);
        setPath("")
    }
    return (
        <section className="FieldContainer mt-5" >
            <div {...getRootProps({ style })}>
                {preview ? (
                    <>
                        <img src={path} alt="Input Preview" />
                        <BasicButton title="Delete Image" onClick={handleDeleteImg} className="baseBtn -mb-3 mt-2" />
                    </>) :
                    (isDragActive ? (
                        <>
                            <input {...getInputProps()} />
                            <p style={{ fontWeight: "bold" }}>Drop the files here ...</p>
                        </>
                    ) : (
                        <>
                            <input {...getInputProps()} />
                            <p style={{ fontWeight: "bold" }}>{"Drag 'n' drop some files here, or click to select files"}</p>
                        </>
                    ))}

            </div>

        </section>
    );
}
export default DropZone;