import React from 'react';
import './App.css';
import PostForm from './components/PostForm';
//import AllComponents from './components/LandingPage/index';
import Posts from './components/Posts';
import {Provider} from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
    <React.Fragment>
      {/* //<AllComponents /> */}
      <PostForm />
      <Posts />
    </React.Fragment>
    </Provider>
  );
}

export default App;
