async function getMovies(callBack, page) {
  const movies = await callBack(page);

  const genresArr = movies.map(getGenres);

  const formatedMovies = [];

  for (let i = 0; i < movies.length; i++) {
    const {
      title,
      release_date,
      poster_path,
      vote_average,
      overview,
      vote_count,
      original_title,
      popularity,
    } = movies[i];
    formatedMovies.push({
      title,
      release_date,
      poster_path,
      vote_average,
      overview,
      vote_count,
      original_title,
      popularity,
    });
    formatedMovies[i].genres = genresArr[i];

    if (formatedMovies[i].genres.length > 3) {
      formatedMovies[i].genresMin = formatedMovies[i].genres.slice(0, 3);
      formatedMovies[i].genresMin.push('Other');
    } else {
      formatedMovies[i].genresMin = formatedMovies[i].genres.slice(0, 3);
    }

    formatedMovies[i].genresMin = formatedMovies[i].genresMin.join(', ');

    if (formatedMovies[i].genresMin.length < 1) {
      formatedMovies[i].genresMin = 'unknown';
    }

    if (formatedMovies[i].release_date === undefined) {
      formatedMovies[i].release_date = 'un';
    }
    formatedMovies[i].release_date = formatedMovies[i].release_date.slice(0, 4);
  }

  saveGallery(formatedMovies);
  return formatedMovies;
}

function getGenres({ genre_ids: gen }) {
  const gens = [];
  const allGenres = JSON.parse(localStorage.getItem('genres'));

  // перебирает массив id жанров в фильме, сравнивает с существующим массивом и формирует новый индивидуальный массив для одного фильма
  for (let i = 0; i < gen.length; i += 1) {
    for (let j = 0; j < allGenres.length; j += 1) {
      if (allGenres[j].id === gen[i]) {
        gens.push(allGenres[j].name);
      }
    }
  }

  // возвращает массив жанров словами
  return gens;
}

function saveGallery(movies) {
  localStorage.setItem('currentColection', JSON.stringify(movies));
}

export { getMovies };
