import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import Desktop from './views/Desktop';
import CompleteProfile from './views/CompleteProfile';
import Mobile from './views/Mobile';
import MapTracking from './views/MapTracking';
// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/desktop" component={Desktop} layout={LayoutDefault} />
          <AppRoute exact path="/complete-profile" component={CompleteProfile} layout={LayoutDefault} />
          <AppRoute exact path="/mobile" component={Mobile} layout={LayoutDefault} />
          <AppRoute exact path="/map/:id" component={MapTracking} layout={LayoutDefault} />
        </Switch>
      )} />
  );
}

export default App;