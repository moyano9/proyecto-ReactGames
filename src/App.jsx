import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Favorites from './pages/Favorites';
import TagGames from './pages/TagGames';
import PublisherDetail from './pages/PublisherDetail';
import Publishers from './pages/Publishers';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';

function App() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#111827',
    },
    main: {
      flex: 1,
    },
  };

  return (
    <Provider store={store}>
      <Router>
        <div style={styles.container}>
          <Header />
          <main style={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/game/:id" element={<GameDetail />} />
              <Route path="/tag/:tagId" element={<TagGames />} />
              <Route path="/publisher/:publisherId" element={<PublisherDetail />} />
              <Route path="/publishers" element={<Publishers />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/events" element={<Events />} />
              <Route path="/my-events" element={<MyEvents />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
