import React from 'react';
import FormPage from '../Form/FormPage.jsx';
import { PickerInline } from 'filestack-react';
import { FILESTACK_KEY } from '../../utils/consts.js';

const DogImages = ({ changeStep, formData }) => {
    return (
        <FormPage>
            <div className={`w-full`}>
                <label className="label">
                    <span className="label-text">
                        Upload some photos of {formData?.name}
                    </span>
                </label>
                <PickerInline
                    apikey={FILESTACK_KEY}
                    onSuccess={(result) => {
                        changeStep(1, {
                            images: result?.filesUploaded?.map((file) => ({
                                url: file.handle,
                            })),
                        });
                    }}
                    pickerOptions={{ maxFiles: 3 }}
                />
            </div>
            {/*<Button onClick={() => _changeStep(1)}>Next</Button>*/}
        </FormPage>
    );
};

export { DogImages };
