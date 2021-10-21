import {useEffect} from 'react';
import Navigator from 'navigator';
import {height} from 'utils/responsive';

export default function App() {
  const viewportListener = () => {
    const metaViewport = document.querySelector('meta[name=viewport]');
    const onResize = () => {
      if (height !== window.innerHeight) {
        metaViewport.setAttribute(
          'content',
          `height=${height}, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1`,
        );
        return;
      }
      metaViewport.setAttribute(
        'content',
        `height=device-height, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1`,
      );
    };
    window.addEventListener('resize', onResize);
  };

  useEffect(viewportListener, []);

  return <Navigator />;
}
