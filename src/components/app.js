import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { IntlProvider } from 'preact-i18n';
import enUs from '../i18n/en-us.json';
import esMx from '../i18n/es-mx.json';

// Code-splitting is automated for routes
import Home from '../routes/home';

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
  };
  
  componentDidMount() {
    this.setState({
      locale: enUs,
    });
  }

  updateLocale(locale) {
    if (!locale) {
      return;
    }

    this.setState({
      locale,
    });
  }

	render() {

    const { locale } = this.state;

		return (
      <IntlProvider definition={locale}>
        <div id="app">
          <Router onChange={this.handleRoute}>
            <Home path="/">
              <button onClick={() => this.updateLocale(enUs)} autofocus>english</button>
              &nbsp;
              <button onClick={() => this.updateLocale(esMx)}>español</button>
            </Home>
          </Router>
        </div>
      </IntlProvider>
		);
	}
}
