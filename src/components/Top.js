import React from 'react'
import { VStack  } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFishFins } from '@fortawesome/free-solid-svg-icons'

const Top = () => {
  return (
    <>
        <VStack h="calc(90vh)" display='flex' justifyContent='center'
        alignItems="center" bg='white' style={{opacity: "0.5", fontWeight: "bold"}}
        >
            <span>左の項目から抽出対象の魚種を選んでください</span><br /><br />
            <FontAwesomeIcon icon={faFishFins}  size="2xl" /><br /><br />
        </VStack>
        
    </>
  )
}

export default Top