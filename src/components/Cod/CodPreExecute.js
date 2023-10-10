import React, { useState, useContext, useEffect } from 'react'
import { Button, VStack, HStack  } from '@chakra-ui/react'
import { FileContext } from '../../FileProvider'
import { useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'



const CodPreExecute = ({setPage, setExecCheck, setSsdCheck, setDouseiCheck}) => {
  const toast = useToast()
  const file = useContext(FileContext) //react context hook (FileProvider.js)
  const [desktopDir, setDesktopDir] = useState("")
  const [loading, setLoading] = useState()

  useEffect( () => {
    (async function() {
      let dir =  await window.myAPI.getDesktop()
      setDesktopDir(dir)
    })()
  }, [])

  const extract = async (arg) => {
    setExecCheck(true)
    setLoading(true)
    let data = await window.myAPI.extract(arg)
    setLoading(false)
    setTimeout(()=> {
        toast({
            title: 'お知らせ',
            description: `${data}`,
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left',
            variant: 'left-accent'
          })
    }, 500)
    setSsdCheck(false)
    setDouseiCheck(false)
    setExecCheck(false)
    setPage("Top")
    file.setSsdFile("")
    file.setDouseiFile("")
  }

  return (
    <>
        <VStack h="calc(90vh)" display='flex' justifyContent='center'
               alignItems="center" bg='white' style={{opacity: "0.5", fontWeight: "bold"}}
        > 
          <h3>＊選択したSSDファイル</h3>
          <HStack>
            <FontAwesomeIcon icon={faFileCsv} size="md" />
            <p>{file.ssdFile}</p>
          </HStack>

          <br /><br />

          <h3>＊選択した動静ファイル</h3>
          <HStack>
            <FontAwesomeIcon icon={faFileCsv} size="md" />
            <p>{file.douseiFile}</p>
          </HStack>

          <br /><br />
          <Button
              isLoading={loading}
              loadingText='抽 出 中...'
              variant='solid'
              onClick={extract.bind(this, [file.ssdFile, file.douseiFile, desktopDir])}
              colorScheme="pink"
              mt={3}
              ml={2}
              opacity={0.9}
              size="sm"
              rounded="full"
          >
              抽 出 開 始
          </Button> 
  
        </VStack>
        
    </>
  )
}

export default CodPreExecute