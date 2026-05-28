import { useEffect } from 'react'

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = title ? `${title} — Car Rental Albania` : 'Car Rental Albania'
    }, [title])
}

export default usePageTitle
