import { useEffect } from 'react'

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = title ? `${title} — Rent a Car Albania` : 'Rent a Car Albania'
    }, [title])
}

export default usePageTitle
