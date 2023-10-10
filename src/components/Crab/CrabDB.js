import React, { useContext } from 'react'
import { Button, VStack  } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FileContext } from '../../FileProvider'

const CrabDB = ({setDBCheck, setPage, dbCheck}) => {

    const file = useContext(FileContext)

    const openFolder = async () => {
        let folder = await window.myAPI.openDialog()
        file.setDBFile(folder.length>0 ? folder : "")
        if(folder.length>0) setDBCheck(true)
    }

    return (
        <>
        <VStack h="calc(90vh)" display='flex' justifyContent='center'
               alignItems="center" bg='white' style={{opacity: "0.5", fontWeight: "bold"}}
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
            <Button rounded="full" variant="solid" colorScheme='blue' onClick={()=> setPage("CrabPreExecute")}>最終確認へ</Button>
           ) : ""} 
          
        </VStack>
        
    </>
    )
}

export default CrabDB