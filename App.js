import React from 'react';
import { ApplicationProvider, Layout, Text,IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as appTheme } from './custom-theme.json'; // <-- Import app theme


import { AppNavigator } from './screens/Navigator'

const theme = { ...lightTheme, ...appTheme };




const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppNavigator />
    </ApplicationProvider>
  </React.Fragment>
);

export default App;