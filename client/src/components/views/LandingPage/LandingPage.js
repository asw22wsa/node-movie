import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'; 
import {API_URL,API_KEY,IMAGE_BASE_URL} from '../../../Config';
import MainImage from './Sections/Mainimage';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response.results);
            setMovies(...[response.results]);
            setMainMovieImage(response.results[0]);
        })

    },[])

    return (
        <div style={{ margin: '0', width: '100%' }}>

            {/* Main image */}
            {MainMovieImage &&
                <MainImage
                image={`${IMAGE_BASE_URL}w1280/${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
                    />
            }

            <div style={{ width:'85%', margin:'1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr/>

                {/* Movie Grid Cards */}
                <Row gutter={[16,16]}>
                {Movies && Movies.map((movie,index) => (
                    <React.Fragment key={index}>
                        <GridCards
                            image={movie.poster_path ? `${IMAGE_BASE_URL}w500/${movie.poster_path}` : null}
                            moveId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}

                </Row>
            </div>

        <div style={{ display:'flex', justifyContent:'center' }}>
            <button>Load More</button>
        </div>

        </div>
    )
}

export default withRouter(LandingPage)
