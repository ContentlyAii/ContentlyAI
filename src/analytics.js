import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize("G-MQ8FX07855"); // Replace with your GA4 Measurement ID
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
