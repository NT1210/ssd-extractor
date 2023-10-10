// import React, { useState, useContext } from 'react'
import React, { useContext } from 'react'
import { Button, VStack  } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FileContext } from '../../FileProvider'

const CodSSD = ({setSsdCheck, setPage, ssdCheck}) => {
  const file = useContext(FileContext)

  const openFolder = async () => {
    let folder = await window.myAPI.openDialog()
    file.setSsdFile(folder.length>0 ? folder : "")
    if(folder.length>0) setSsdCheck(true)
  }

  return (
    <>
        <VStack h="calc(90vh)" display='flex' justifyContent='center'
               alignItems="center" bg='white' style={{opacity: "0.5", fontWeight: "bold"}}
        >
          <Button onClick={openFolder}>
            <FontAwesomeIcon icon={faFileArrowUp} size="2xl" />  
          </Button>
          <h2>SSDファイルを選択してください</h2>
          <br />
          <p>【選択済ファイル】</p>
          {file.ssdFile ? (
              <p style={{maxWidth: "80%", border: "2px dotted black", padding: "5px 5px 10px 10px", color:"blue"}}>{file.ssdFile.toString()}</p>
          ) : <p>ファイルが選択されていません</p>}
          
          <br /><br />

           {ssdCheck? (
            <Button rounded="full" variant="solid" colorScheme='blue' onClick={()=> setPage("CodDousei")}>動静ファイル選択へ</Button>
           ) : ""} 
          
        </VStack>
        
    </>
  )
}



export default CodSSD