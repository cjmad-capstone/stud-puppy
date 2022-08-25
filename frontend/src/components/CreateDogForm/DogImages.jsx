import React from 'react';
import Button from '../Button/Button.jsx';
import FormPage from '../Form/FormPage.jsx';
import Dropzone from 'react-dropzone';

const DogImages = ({ changeStep, formData }) => {
    const [files, setFiles] = React.useState([]);
    const [errors, setErrors] = React.useState({});

    const _changeStep = async (dir) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const images = files.map((file) => ({ url: file.path }));
        changeStep(dir, { images });
    };
    return (
        <FormPage errors={errors}>
            <div className={`w-full`}>
                <label className="label">
                    <span className="label-text">
                        Upload some photos of {formData?.name}
                    </span>
                </label>
                <Dropzone onDrop={(acceptedFiles) => setFiles(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <>
                            <section
                                className={`border-secondary border-2 p-4 border-dashed`}
                            >
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>
                                        Drag 'n' drop some files here, or click
                                        to select files
                                    </p>
                                </div>
                            </section>
                            <ul>
                                {files.map((file, idx) => (
                                    <li key={idx}>{file.path}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </Dropzone>
            </div>
            <Button onClick={() => _changeStep(1)}>Next</Button>
        </FormPage>
    );
};

export { DogImages };
