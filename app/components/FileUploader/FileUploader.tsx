import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';

type Props = {
  image: any;
  setImage: (image: any) => void;
};

const FileUploader = ({ image, setImage }: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles: any) => {
      setImage(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )[0]
      );
    }
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    if (image) {
      return () => URL.revokeObjectURL(image.preview);
    } else return;
  }, []);

  return (
    <div className="mt-12">
      <p className="text-2xl font-semibold text-center">Upload Image</p>
      <div
        {...getRootProps({
          className:
            'dropzone w-full border-[0.2px] border-dashed bg-gray-200 p-5 dark:bg-gray-800 border-gray-500 rounded-xl dark:border-white flex flex-col gap-5 justify-center text-center items-center mt-5 cursor-pointer overflow-hidden'
        })}
      >
        <input {...getInputProps()} />

        {image ? (
          <img
            src={image.preview}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(image.preview);
            }}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-44 flex-col items-center justify-center">
            <p className="text-center">PNG, JPEG, or GIF. Max 10mb. </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;