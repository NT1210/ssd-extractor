import React, { useContext } from 'react'
import { Button, VStack  } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FileContext } from '../../FileProvider'

const CrabOPDB = ({setDBCheck, setPage, dbCheck}) => {

    const file = useContext(FileContext)

    const openFolder = async () => {
        let folder = await window.myAPI.openDialog()
        file.setDBFile(folder.length>0 ? folder : "")
        if(folder.length>0) setDBCheck(true)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const target = e.dataTransfer.files[0]
        file.setDBFile(target.path)
        setDBCheck(true)
      }
    
      const handleDrag = (e) => {
        e.preventDefault()
      }

    return (
        <>
        <VStack h="calc(90vh)" display='flex' justifyContent='center'
               alignItems="center" bg='white' style={{opacity: "0.5", fontWeight: "bold"}}
               onDragOver={handleDrag} onDrop={handleDrop}
        >

          <Button onClick={openFolder}>
            <FontAwesomeIcon icon={faFileArrowUp} size="2xl" />  
          </Button>
          <h2>生産者DBを選択してください</h2>
          <br />
          <p>【選択済ファイル】</p>
          {file.dbFile ? (
              <p style={{maxWidth: "80%", border: "2px dotted black", padding: "5px 5px 10px 10px", color:"blue"}}>{file.dbFile.toString()}</p>
          ) : <p>ファイルが選択されていません</p>}
          
          <br /><br />
          {/* <Button rounded="full" variant="solid" colorScheme='blue' onClick={()=> setPage("Cod")}>前へ</Button> */}
           {dbCheck? (
            <Button rounded="full" variant="solid" colorScheme='blue' onClick={()=> setPage("CrabOPPreExecute")}>最終確認へ</Button>
           ) : ""} 
          
        </VStack>
        
    </>
    )
}

export default CrabOPDB