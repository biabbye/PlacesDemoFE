import React, { useContext } from 'react';
import {Provider} from 'react-redux';
import {store} from './src/Features/store'

import Main from './src/Main';
import { AuthProvider } from './src/context/AuthContext';
import { AuthContext } from './src/context/AuthContext';

const App = () => {

   return (
      
    <Provider store={store}>
      <AuthProvider>
        
          <Main />
       
      </AuthProvider>
    </Provider>

      
  );


}

export default App;
