"use client"
import uploadImageFile from "./utils/utils";
import FileUploader from './components/FileUploader/FileUploader';
import { useState } from 'react';


export default function Home() {
  const [image, setImage] = useState(null)
  return (
    <main className="flex w-full h-screen flex-col justify-center items-center">
    <FileUploader image={image} setImage={setImage} />
    <button
      className="bg-black text-white py-4 px-4 mt-4"
      onClick={() => uploadImageFile(image)}
      onKeyDown={() => uploadImageFile(image)}
      tabIndex={0}
    >
      Submit
    </button>
  </main>
  )
}
