import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

import { useEffect } from "react";
import { registerApp, getAuthToken } from "./api/api";

import TopUsersPage from './pages/TopUsersPage';
import TrendingPostsPage from './pages/TrendingPostsPage';
import FeedPage from './pages/FeedPage';

function App() {
  useEffect(() => {
    const initApp = async () => {
      try {
        await registerApp();      // optional if already registered once
        await getAuthToken();     // get and store the token
      } catch (err) {
        console.error("App init failed", err);
      }
    };
  
    initApp();
  }, []);
  
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/top-users">Top Users</Button>
          <Button color="inherit" component={Link} to="/trending-posts">Trending Posts</Button>
          <Button color="inherit" component={Link} to="/feed">Feed</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/top-users" element={<TopUsersPage />} />
          <Route path="/trending-posts" element={<TrendingPostsPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
