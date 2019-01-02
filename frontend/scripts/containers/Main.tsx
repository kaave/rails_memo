import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Main = () => (
  <main className="Main" id="main" role="main">
    Main!
  </main>
);

export function mount() {
  ReactDOM.render(<Main />, document.getElementById('mount-point'));
}
