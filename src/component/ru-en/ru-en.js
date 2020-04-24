import React from "react";
import { render } from "react-dom";
import "./ru-en.css";

const LanguageContext = React.createContext();
const LanguageConsumer = LanguageContext.Consumer;

class LanguageProvider extends React.Component {
    state = {
        language: "french"
    };

    updateLanguage = e => this.setState({ language: e.target.value });

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
            {({ updateLanguage }) => (
                <header>
                    see this site in
                    <select onChange={updateLanguage}>
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
        {({ language }) => props.dictionary[language]}
    </LanguageConsumer>
);

const SiteExapmle = () => (
    <LanguageProvider>
        <div>
            <Header />
            <h1>
                <TranslatableText
                    dictionary={{
                        french: "Bonjour, Michel!",
                        english: "Hello, Michael!",
                        italian: "Ciao, Michele!"
                    }}
                />
            </h1>
        </div>
    </LanguageProvider>
);

export default SiteExapmle();
