import Footer from "./components/general/Footer";
import Header from "./components/general/Header";
import ChurchMain from "./components/church/Main";
import MemberMain from "./components/member/Main";
import NonMemberMain from "./components/non_member/Main";
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route exact path='/church_media/:media_id/:user_id' component={ChurchMain} />
        <Route exact path='/media/:media_id/:user_id/:member_id' component={MemberMain} />
        <Route exact path='/m/:media_id/:user_id/:member_id' component={NonMemberMain} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
