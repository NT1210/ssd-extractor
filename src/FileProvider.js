import React, { useState } from 'react'
import { createContext } from 'react'

export const FileContext = createContext()

export const FileProvider = ({children}) => {
    const [ssdFile, setSsdFile] = useState("")
    const [douseiFile, setDouseiFile] = useState("")
    const [dbFile, setDBFile] = useState("")

    return (
        <FileContext.Provider value={{ssdFile, douseiFile, setSsdFile, setDouseiFile, dbFile, setDBFile}}> 
            {children}
        </FileContext.Provider>
    )
}