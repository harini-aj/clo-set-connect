import { useEffect, useState } from "react"

const useDebounce = <T,>(value: T, delay = 300):T => {
    const [debounced, setDebounced] = useState<T>(value)
    
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setDebounced(value)
        }, delay)

        return (() => {
            clearTimeout(timeOutId)
        })
    }, [value, delay])

    return debounced
}

export default useDebounce
