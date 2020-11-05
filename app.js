const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const movieList = require('./movies.json')


app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', {movies: movieList.results})
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => 
    movie.id.toString() === req.params.movie_id
  )
  console.log(movie)
  res.render('show', {movie: movie})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filteredMovies = movieList.results.filter(movie => {
    return movie.title.trim().toLowerCase().includes(req.query.keyword.trim().toLowerCase())
  })
  res.render('index', {movies: filteredMovies, keyword: keyword})
})

app.listen(port, () => {
  console.log(`this server is running on http://localhost:${port}`)
})