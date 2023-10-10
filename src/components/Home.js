import React from 'react'
import { useState, useContext } from 'react'
import { Button } from '@chakra-ui/react'
import { Grid, GridItem, Breadcrumb, BreadcrumbItem, BreadcrumbLink} from '@chakra-ui/react'
import { ChevronRightIcon, RepeatIcon, CheckIcon } from '@chakra-ui/icons'

import Top from './Top'
import CodSSD from './Cod/CodSSD'
import CodDousei from './Cod/CodDousei'
import CodPreExecute from './Cod/CodPreExecute'

import CrabSSD from './Crab/CrabSSD'
import CrabDousei from './Crab/CrabDousei'
import CrabDB from './Crab/CrabDB'
import CrabPreExecute from './Crab/CrabPreExecute'

import CrabOPSSD from './CrabOP/CrabOPSSD'
import CrabOPDousei from './CrabOP/CrabOPDousei'
import CrabOPDB from './CrabOP/CrabOPDB'
import CrabOPPreExecute from './CrabOP/CrabOPPreExecute'

import { FileContext } from '../FileProvider'

const Home = () => {
    const file = useContext(FileContext)
    const [page, setPage] = useState("Top")
    const [ssdCheck, setSsdCheck] = useState(false)
    const [douseiCheck, setDouseiCheck] = useState(false)
    const [dbCheck, setDBCheck] = useState(false)
    const [execCheck, setExecCheck] = useState(false)

    const codPages = ["Cod", "CodDousei", "CodPreExecute"]
    const crabPages = ["Crab", "CrabDousei", "CrabPreExecute", "CrabDB"]
    const crabOPPages = ["CrabOP", "CrabOPusei", "CrabOPeExecute", "CrabOP"]


    const goTop = async () => {
        let answer = await window.confirm("ホームに戻ります。アップロード済みファイルが削除されますが良いですか？")
        if(answer){
            setPage("Top")
            setSsdCheck(false)
            setDouseiCheck(false)
            setDBCheck(false)
            setExecCheck(false)
            file.setSsdFile("")
            file.setDouseiFile("")
            file.setDBFile("")
        }else {
            //do nothing
        }
    }
    
    return (
        <>
            <Grid
                h='calc(99vh)'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={1}
            >
                <GridItem rowSpan={2} colSpan={1} bg='white' mt={1} ml={1}>
                    {/* <Button ml={1} mt={5} width={{base: "95%"}} variantColor="teal" variant="outline" style={{fontSize:"15px", opacity:"0.8"}} shadow="md">
                        取扱説明
                    </Button> */}
                    <Button onClick={()=>setPage("Cod")} isDisabled={crabPages.indexOf(page) !== -1 || crabOPPages.indexOf(page) !== -1 ? true : false} ml={1} mt={3} width={{base: "95%"}} variantColor="teal" variant="outline" style={{fontSize:"15px", opacity:"0.8"}} shadow="md">
                        極東延縄マダラ
                    </Button>
                    <Button onClick={()=>setPage("Crab")} isDisabled={codPages.indexOf(page) !== -1 || crabOPPages.indexOf(page) !== -1 ? true : false} ml={1} mt={3} width={{base: "95%"}} variantColor="teal" variant="outline" style={{fontSize:"15px", opacity:"0.8"}} shadow="md">
                        極東タラバ
                    </Button>
                    <Button  onClick={()=>setPage("CrabOP")} isDisabled={codPages.indexOf(page) !== -1 || crabPages.indexOf(page) !== -1 ? true : false} ml={1} mt={3} width={{base: "95%"}} variantColor="teal" variant="outline" style={{fontSize:"15px", opacity:"0.8"}} shadow="md">
                        極東オピリオ
                    </Button>
                    <Button onClick={goTop} variantColor="teal" variant="outline" style={{position:"fixed", left:"10px", top:"450px"}} >
                        <RepeatIcon style={{opacity:"0.7"}}  boxSize="1em" />
                    </Button>
                </GridItem>

                {
                    page === "Top" && (
                        <GridItem h={10} rowSpan={1} colSpan={4} bg='white' mt={1} mr={1} ></GridItem>
                    ) 
                }

                {
                    page.includes("Cod") && (
                        <GridItem h={10} rowSpan={1} colSpan={4} bg='white' mt={1} mr={1} >
                        <Breadcrumb style={{fontWeight:"bold"}} mt={2} ml={10} spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                            <BreadcrumbItem style={{opacity:"0.5"}} >
                                <BreadcrumbLink style={{textDecoration:"none", cursor:"default"}} >
                                    {ssdCheck ? <CheckIcon color="green" mr={1} mb={1}/> : "" }SSDファイル選択
                                </BreadcrumbLink>
                            </BreadcrumbItem>
        
                            <BreadcrumbItem style={{opacity:"0.5"}} >
                                <BreadcrumbLink style={{textDecoration:"none", cursor:"default"}}>
                                    {douseiCheck ? <CheckIcon color="green" mr={1} mb={1}/> : "" }動静ファイル選択
                                </BreadcrumbLink>
                            </BreadcrumbItem>
        
                            <BreadcrumbItem style={{opacity:"0.5"}} >
                                <BreadcrumbLink style={{textDecoration:"none", cursor:"default"}}>
                                    { execCheck ? <CheckIcon color="green" mr={1} mb={1}/> : ""}抽出
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>     
                        </GridItem>
                    ) 
                }


                {
                    page.includes("Crab") && (
                        <GridItem h={10} rowSpan={1} colSpan={4} bg='white' mt={1} mr={1} >
                        <Breadcrumb style={{fontWeight:"bold"}} mt={2} ml={10} spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                            <BreadcrumbItem style={{opacity:"0.5"}} >
                                <BreadcrumbLink style={{textDecoration:"none", cursor:"default"}} >
                                    {ssdCheck ? <CheckIcon color="green" mr={1} mb={1}/> : "" }SSDファイル選択
                                </BreadcrumbLink>
                            </BreadcrumbItem>
        
                            <BreadcrumbItem style={{opacity:"0.5"}} >
                                <BreadcrumbLink style={{textDecoration:"none", cursor:"default"}}>
                                    {douseiCheck ? <CheckIcon color="green" mr={1} mb={1}/> : "" }動静ファイル選択
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem style={{opacity:"0.5"}} >
                                <BreadcrumbLink style={{textDecoration:"none", cursor:"default"}}>
                                    {dbCheck ? <CheckIcon color="green" mr={1} mb={1}/> : "" }生産者DB選択
                                </BreadcrumbLink>
                            </BreadcrumbItem>
        
                            <BreadcrumbItem style={{opacity:"0.5"}} >
                                <BreadcrumbLink style={{textDecoration:"none", cursor:"default"}}>
                                    { execCheck ? <CheckIcon color="green" mr={1} mb={1}/> : ""}抽出
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>     
                        </GridItem>
                    )
                }

                
                


                <GridItem rowSpan={1} colSpan={4} bg='white' mr={1}>
                    {page==="Top" && <Top />}

                    {page==="Cod" && <CodSSD setSsdCheck={setSsdCheck} setPage={setPage} ssdCheck={ssdCheck} />}
                    {page==="CodDousei" && <CodDousei setDouseiCheck={setDouseiCheck} setPage={setPage} douseiCheck={douseiCheck}/>}
                    {page==="CodPreExecute" && <CodPreExecute setSsdCheck={setSsdCheck} setDouseiCheck={setDouseiCheck}  setPage={setPage} setExecCheck={setExecCheck} />}

                    {page==="Crab" && <CrabSSD setSsdCheck={setSsdCheck} setPage={setPage} ssdCheck={ssdCheck} />}
                    {page==="CrabDousei" && <CrabDousei setDouseiCheck={setDouseiCheck} setPage={setPage} douseiCheck={douseiCheck}/>}
                    {page==="CrabDB" && <CrabDB setDBCheck={setDBCheck} setPage={setPage} dbCheck={dbCheck}/>}
                    {page==="CrabPreExecute" && <CrabPreExecute setSsdCheck={setSsdCheck} setDouseiCheck={setDouseiCheck}  setPage={setPage} setDBCheck={setDBCheck} setExecCheck={setExecCheck} />}

                    {page==="CrabOP" && <CrabOPSSD setSsdCheck={setSsdCheck} setPage={setPage} ssdCheck={ssdCheck} />}
                    {page==="CrabOPDousei" && <CrabOPDousei setDouseiCheck={setDouseiCheck} setPage={setPage} douseiCheck={douseiCheck}/>}
                    {page==="CrabOPDB" && <CrabOPDB setDBCheck={setDBCheck} setPage={setPage} dbCheck={dbCheck}/>}
                    {page==="CrabOPPreExecute" && <CrabOPPreExecute setSsdCheck={setSsdCheck} setDouseiCheck={setDouseiCheck}  setPage={setPage} setDBCheck={setDBCheck} setExecCheck={setExecCheck} />}
                </GridItem>
            </Grid>
        </>
    )
}



export default Home