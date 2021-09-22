import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import Landing from './components/landing/Landing';
import LoginCard from './components/login/LoginCard';
import SignupCard from './components/signup/SignupCard';
import Header from './components/general/Header';
import storageService from './services/storage.service';

import { store } from './redux/store';
import { setAxiosHeaderAuthToken } from './util/helpers';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/auth.action';
import { AUTH_TOKEN_STORAGE_KEY } from './util/constants';
import Footer from './components/general/Footer';

if (storageService.getItem(AUTH_TOKEN_STORAGE_KEY)) {
  setAxiosHeaderAuthToken(storageService.getItem(AUTH_TOKEN_STORAGE_KEY));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Header />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/login' component={LoginCard} />
            <Route exact path='/signup' component={SignupCard} />
            {/* <Route exact path='/profile/:id' /> */}
            {/* <Route exact path='/requests' /> */}
          </Switch>
          <Footer />
        </Router>
        <ToastContainer
          draggable={false}
          hideProgressBar={true}
          position={toast.POSITION.BOTTOM_CENTER}
          theme='colored'
          transition={Slide}
        />
      </div>
    </Provider>
  );
};

export default App;
