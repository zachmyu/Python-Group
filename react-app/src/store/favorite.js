const GET_FAVORITES = 'favorites/GET_FAVORITE'
const CREATE_FAVORITE = 'favorites/CREATE_FAVORITE'
const DELETE_FAVORITE = 'favorites/DELETE_FAVORITE'

const loadFavorites = favorite => ({
    type: GET_FAVORITES,
    favorite
})


const addFavorites = favorites => ({
    type: CREATE_FAVORITE,
    favorites
})

const deleteSingleFavorite = favorite => ({
    type: DELETE_FAVORITE,
    favorite
})




export const createFavorites = (favoriteInfo) => async (dispatch) => {
    const response = await fetch(`/api/favorites/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favoriteInfo)
    })
    if (response.ok) {
        const newFavorite = await response.json()
        dispatch(addFavorites(newFavorite))
        console.log("DATA FROM FAVORITE STORE RIGHT AFTER DISPATCH", newFavorite)
    }
    console.log('this is just the favoriteInfo var on store', favoriteInfo)
}


export const deleteFavorites = (favoriteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteSingleFavorite(favoriteId))
        console.log('THIS IS HERE TO SEE IF THE RESPONSE IS OK WHEN DELETING A FAVORITE')
    }
    console.log('THIS WILL PRINT THIS MESSAGE IF THE INFO FROM DELETING IS GETTING TO THE THUNK FOR FAVORITES', favoriteId)

}

export const getFavorites = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${user_id}`)

    if (response.ok) {
        const favorites = await response.json()
        dispatch(loadFavorites(favorites))
    }
}

const initialState = {}

export default function favorites(state = initialState, action) {
    let updatedState = { ...state }
    let newState;
    switch (action.type) {
        case GET_FAVORITES: {
            //     return {...state, ...action.favorites}
            // let newState = {}
            // action.payload.favorites.forEach(favorite => {
            //     newState[favorite.id] = favorite
            // })
            // return newState
            updatedState[action.favorite.id] = action.favorite
            return updatedState
            // newState = {}
            // action.favorites.forEach(favorite => {
            //     newState[favorite.id] = favorite
            // })
            // return newState
        }


        case CREATE_FAVORITE:
            updatedState[action.favorite.id] = action.favorite
            return updatedState
        case DELETE_FAVORITE: {
            delete updatedState[action.favorite]
            return updatedState
        }
        default:
            return state
    }
}