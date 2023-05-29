import { useState, useCallback } from 'react'
export default () => {
    const [user, setUser] = useState({})

    const setUserData = useCallback((username, user_id, level) => {
        setUser({ username: username, user_id: user_id , level: level})
    }, [])

    return { user, setUserData }
}