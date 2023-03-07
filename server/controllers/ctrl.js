const movies = require('../db.json');
let globalID = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },

    deleteMovie: (req, res) => {
        // destructure id from the route params
        const { id } = req.params;

        // loop through the movies array to find the movie with the id
        const index = movies.findIndex(movie => movie.id === +id);

        //splice the movie out of the movies arrray and send status 200 with the updated array
        if (index >= 0) {
            movies.splice(index, 1);
            res.status(200).send(movies);
        } else {
            res.sendStatus(404);
        }
    },

    updateMovie: (req, res) => {
        // destructure id from the route params
        const { id } = req.params;

        // destructure the type from the body
        const { type } = req.body;

        // loop through the movies array to find the movie with the id
        const idx = movies.findIndex(movie => movie.id === +id);
                
        // if type is plus increment the movie rating by 1 else decrement rating by 1
        if (type === "plus") {
            if(movies[idx].rating < 5) {
                movies[idx].rating++;
                res.status(200).send(movies);
            }
        } else {
            if(movies[idx].rating > 1)  {
                movies[idx].rating--;
                res.status(200).send(movies);
            }
        }
        // if rating already 5 do nothing or rating is 1
        // send the movies
    },

    addMovie: (req, res) => {
        // destructure the body obj
        const { title, rating, imageURL } = req.body

        // check body to make sure all data exists
        if (!title || !rating || !imageURL) {
            res.sendStatus(400);
        }

        // copy body obj and add new id 
        const copy = {...req.body, id: globalID};

        // push the copy to movies array
        movies.push(copy);
        globalID++;
        
        // send status 200 with updated movies array
        res.status(200).send(movies);
    }
}