import logo from './logo.svg';
import './App.css';
import AppRouts from './Routers';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppRouts />
      </ChakraProvider>
    </Provider>

  );
}

export default App;
