import { useDropzone } from 'react-dropzone';
import React, { useEffect, useState } from 'react';

const FileDropzone = () => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        noKeyboard: true,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const thumbs = files.map((file) => (
        <li
            key={file?.path}
            className={`max-w-[100px] max-h-[100px] overflow-hidden`}
        >
            <img
                className={`object-cover object-center w-full h-full`}
                src={file?.preview}
                // Revoke data uri after image is loaded
                onLoad={() => {
                    URL.revokeObjectURL(file?.preview);
                }}
                alt={'thumbnail'}
            />
        </li>
    ));
    return (
        <div>
            <div
                {...getRootProps()}
                className={`border-secondary border-2 border-dashed p-4`}
            >
                <input {...getInputProps()} />
                <p>
                    Drag &lsquo;n&lsquo; drop some files here, or click to
                    select files
                </p>
            </div>
            {files.length > 0 && (
                <aside>
                    <h4>Previews</h4>
                    <ul className={`flex flex-wrap gap-2 justify-center`}>
                        {thumbs}
                    </ul>
                </aside>
            )}
        </div>
    );
};
export default FileDropzone;
