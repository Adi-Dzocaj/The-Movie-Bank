import { createContext, useContext, useState } from 'react'

const UrlContext = createContext()


export const useUrlPrefixerContext = () => {
    return useContext(UrlContext)
}

const UrlContextProvider = ({ children }) => {
    const [UrlPrefixer, setUrlPrefixer] = useState('https://image.tmdb.org/t/p/w500')

    const values = {
		UrlPrefixer
    }

    return (
        <UrlContext.Provider value={values}>
            {children}
        </UrlContext.Provider>
    )
}

export default UrlContextProvider