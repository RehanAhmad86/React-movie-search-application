import React, { useEffect, useState } from 'react'

const MOVIE_API = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const App = () => {
    let [movies, setMovies] = useState([])
    let [inputValue, setInputValue] = useState('')
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        fetch(MOVIE_API).then((response) => response.json()).then((jsonResponse) => setMovies(jsonResponse.Search))
    }, [])

    const searchMovie = async searchValue => {
        setLoading(true)
        await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === "True") {
                    setMovies(jsonResponse.Search)
                }
                setLoading(false)
            })
    }
    return (
        <div>
            <div className='flex justify-center gap-x-10 gap-y-5 flex-wrap mt-10 font-serif'>
                <div>
                    <input value={inputValue} type='text' placeholder='Enter movie name' onChange={event => setInputValue(event.target.value)}
                        className='w-72  bg-orange-100 pl-2 p-2 rounded-md outline-none focus:outline-none' />
                    <button onClick={() => searchMovie(inputValue)} className='p-2 bg-black text-white px-4 rounded-md relative right-5'>Search</button>
                </div>
            </div>
            <div className='flex justify-center gap-x-10 gap-y-5 flex-wrap mt-10 font-serif'>
                {
                    loading ? (<span className=''>Loading! please wait</span>
                    ) : (
                        movies.map((movie, index) => (
                            <div key={index} className='felx flex-col items-center justify-center text-center w-60'>
                                <div>{movie.Title}</div>
                                <div className='flex justify-center'><img src={movie.Poster} className='w-52 h-72' /></div>
                                <div>{movie.Year}</div>
                            </div>
                        )))
                }

            </div>
        </div>
    )
}
export default App









