import React from 'react';
import {render} from "react-dom";
import './index.css';

const LanguageContext = React.createContext();
const LanguageConsumer = LanguageContext.Consumer;

class LanguageProvider extends React.Component {
    state = {
        language: "russian",
        dictionary: {
            russian: "Привет, Виталя!",
            french: "Bonjour, Vitaliy!",
            english: "Hello, Vitaliy!",
            italian: "Ciao, Vitaliy!"
        },
    };

    updateLanguage = e => this.setState({language: e.target.value});

    render() {
        return (
            <LanguageContext.Provider
                value={{
                    language: this.state.language,
                    updateLanguage: this.updateLanguage
                }}
            >
                {this.props.children}
            </LanguageContext.Provider>
        );
    }
}

const Header = () => {
    return (
        <LanguageConsumer>
            {({updateLanguage}) => (
                <header>
                    {/*see this site in*/}
                    {/*{({language}) => props.dictionaryText[language]}*/}
                    <select onChange={updateLanguage}>
                        <option value="russian">русский</option>
                        <option value="french">french</option>
                        <option value="english">english</option>
                        <option value="italian">italian</option>
                    </select>
                </header>
            )}
        </LanguageConsumer>
    );
};

const TranslatableText = props => (
    <LanguageConsumer>
        {({language}) => props.dictionaryText[language]}
    </LanguageConsumer>
);

const App = () => (
    <LanguageProvider>
        <div>
            <Header/>
            <h1>
                <TranslatableText
                    dictionaryText={{
                        russian: "Привет, Виталя!",
                        french: "Bonjour, Vitaliy!",
                        english: "Hello, Vitaliy!",
                        italian: "Ciao, Vitaliy!"
                    }}
                    dictionaryHead={{
                        russian: "Посмотреть сайт на",
                        french: "Bonjour, Vitaliy!",
                        english: "Hello, Vitaliy!",
                        italian: "Ciao, Vitaliy!"
                    }}
                />
            </h1>
        </div>
    </LanguageProvider>
);

render(<App/>, document.getElementById("root"));
