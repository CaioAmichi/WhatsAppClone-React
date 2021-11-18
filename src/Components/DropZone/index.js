import React, {useCallback, useState} from 'react';
import { FileCopy } from '@material-ui/icons';
import {useDropzone} from 'react-dropzone';
import './styles.css';



export default ({onFileUploaded}) =>{

    const [selectedFileUrl, setSelectedFileUrl] = useState("");
    
    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0]
      
      const fileUrl = URL.createObjectURL(file)

      setSelectedFileUrl(fileUrl)

      onFileUploaded(file)



    }, [onFileUploaded])

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept:'image/*'})

    return (
        <div className="chatWindow--emotearea"{...getRootProps()}>
            <input {...getInputProps()} accept='image/*' />
            {
                selectedFileUrl
                ? <img src = {selectedFileUrl} alt="Imagem do Estabelecimento"/>
                : 
                <p>
                    <FileCopy/>
                    Enviar Imagem
                </p>              

            }
            
        </div>
    )
    
}

