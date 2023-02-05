import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../config/firebase.config";

export interface IFile {
    name: string;
    size: Blob | ArrayBuffer | Uint8Array
}

export function PhotoCharacter () {
    const [file, setFile] = useState<IFile>({name: "", size: new ArrayBuffer(0)});
    const [percent, setPercent] = useState(0);

    function handleChange(event: any) : void {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(storage, `/files/${file?.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file.size);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };
    return (
        <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
               <button onClick={handleUpload}>Upload Photo Character</button>
               <p>{percent} "% done"</p>
        </div>
    )
}