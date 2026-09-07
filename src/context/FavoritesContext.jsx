import { createContext, useContext, useEffect, useState, useCallback } from "react"

const FavoritesContext = createContext(null)
const STORAGE_KEY = "reel:favorites"

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback(
    (id, mediaType) => favorites.some((f) => f.id === id && f.mediaType === mediaType),
    [favorites]
  )

  const toggleFavorite = useCallback((item) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.id === item.id && f.mediaType === item.mediaType
      )
      if (exists) {
        return prev.filter(
          (f) => !(f.id === item.id && f.mediaType === item.mediaType)
        )
      }
      return [...prev, item]
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider")
  return ctx
}
