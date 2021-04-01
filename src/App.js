import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path='/media/:media_id/:user_id' component={Main} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
