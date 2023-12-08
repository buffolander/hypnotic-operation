import { Admin, Resource, ListGuesser, DataProvider } from "react-admin";

import dataProvider from './providers/DataProvider'
import { InvestorShow } from './components/InvestorShow';
import theme from './theme';


const App = () => (
  // TODO: Complete DataProvider implementation and clean up type coercion
  <Admin dataProvider={dataProvider as unknown as DataProvider} theme={theme}>
    <Resource name="investors" list={ListGuesser} show={InvestorShow} />
  </Admin>
);

export default App;
