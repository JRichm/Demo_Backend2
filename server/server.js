const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = (4004);

const { getMovies, deleteMovie, updateMovie, addMovie } = require('./controllers/ctrl');

app.get("/api/movies", getMovies);
app.delete("/api/movies/:id", deleteMovie);
app.put("/api/movies/:id", updateMovie);
app.post("/api/movies", addMovie);

app.listen(port, () => console.log(`server is up on ${port}`));