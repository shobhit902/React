import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "thewdb";
  async function searchMovies(title) {
    if (!title) {
      setError("Please enter a movie title.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      setMovies([]);
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          title
        )}`
      );

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found.");
      }

      setMovies(data.Search);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 Movie Search</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies(query);
            }
          }}
          placeholder="Enter movie title..."
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={() => searchMovies(query)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center my-4">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="mt-2">Loading movies...</p>
        </div>
      )}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {movies.map((movie) => (
            <li
              key={movie.imdbID}
              className="border rounded p-2 flex flex-col items-center shadow"
            >
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-32 h-48 object-cover mb-2"
                />
              ) : (
                <div className="w-32 h-48 bg-gray-300 flex items-center justify-center mb-2">
                  No Image
                </div>
              )}
              <p className="font-semibold text-center">{movie.Title}</p>
              <p className="text-sm text-gray-600">{movie.Year}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
