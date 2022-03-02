import { ThemeProvider } from "react-jss";
import { theme } from "./theme";

import Carousel from './Carousel'
import albums from './albums'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className='app-main'>
          <div className='spacer'>
            <h1 className='apptitle'>Get Records!</h1>
          </div>
          <Carousel albums={albums} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
