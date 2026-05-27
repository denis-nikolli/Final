import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const s = localStorage.getItem('rcar_user')
            return s ? JSON.parse(s) : null
        } catch { return null }
    })

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('rcar_user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('rcar_user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
