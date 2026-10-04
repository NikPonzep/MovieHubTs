import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';

import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import WatchListPage from './pages/WatchListPage/WatchListPage';

import type { Movie, Watch } from './domain/MovieBase';

function App() {
  const [watch, setWatch] = useState<Watch[]>([]);

  function addToWatch(movie: Movie) {
    const newWatch: Watch = {
      ...movie,
      WatchId: Date.now()
    };

    setWatch([...watch, newWatch]);
  }

  function removeWatch(watchId: number) {
    setWatch(
      watch.filter(movie => movie.WatchId !== watchId)
    );
  }

  return (
    <BrowserRouter>
      <div className="app">

        <Header moviecount={watch.length} />

        <main>
          <Routes>

            <Route
              path="/"
              element={
                <Home
                  watch={watch}
                  onAdd={addToWatch}
                  onRemove={removeWatch}
                />
              }
            />

            <Route
              path="/movies"
              element={
                <Movies
                  onAdd={addToWatch}
                />
              }
            />

            <Route
              path="/watchlist"
              element={
                <WatchListPage
                  watch={watch}
                  onRemove={removeWatch}
                />
              }
            />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;