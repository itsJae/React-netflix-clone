import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./Row.css";

function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {movies && movies.length > 0 ? (
            movies.map((movie) => {
              return (
                <img
                  key={movie.id}
                  style={{ padding: "25px 0" }}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name || movie.title}
                />
              );
            })
          ) : (
            <p>No movies available.</p>
          )}
        </div>
        <div
          className="slider__arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth + 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div>
    </section>
  );
}

export default Row;
