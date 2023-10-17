import logo from './logo.svg';
import './App.css';
import AppRouts from './Routers';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <AppRouts />
    </ChakraProvider>
  );
}

export default App;
