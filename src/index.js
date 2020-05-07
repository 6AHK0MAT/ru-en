import React from 'react';
import {render} from "react-dom";
import './index.css';

const LanguageContext = React.createContext();
const LanguageConsumer = LanguageContext.Consumer;

class LanguageProvider extends React.Component {
    state = {
        language: "russian",
    };

    updateLanguage = e => this.setState({language: e.target.value});

    render() {
        console.log(this.props);
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

const TranslatableText2 = props => (
    <LanguageConsumer>
        {({language}) => {
            return (
                <table border="1" width="100%" cellPadding="5">
                    <tr>
                        <th>{props.dictionaryText2[language][0].head1}</th>
                        <th>{props.dictionaryText2[language][0].head2}</th>
                    </tr>
                    <tr>
                        <td>{props.dictionaryText2[language][1].text1}</td>
                        <td>{props.dictionaryText2[language][1].text2}</td>
                    </tr>
                    <tr>
                        <td>{props.dictionaryText2[language][2].text1}</td>
                        <td>{props.dictionaryText2[language][2].text2}</td>
                    </tr>
                    <tr>
                        <td>{props.dictionaryText2[language][3].text1}</td>
                        <td>{props.dictionaryText2[language][3].text2}</td>
                    </tr>
                </table>



            )
        }
        }

    </LanguageConsumer>
);

const App = () => (
    <LanguageProvider>
        <div>
            <Header/>
            <h1>
                <TranslatableText
                    dictionaryText={{
                        russian: 'Пример перевода таблицы',
                        french: "Exemple de traduction de table",
                        english: "Table translation example!",
                        italian: "Esempio di traduzione della tabella",
                    }}
                />
                <TranslatableText2
                    dictionaryText2={{
                        russian: [
                            {head1: 'Заголовок 1', head2: 'Заголовок 2'},
                            {text1: 'Строка 1', text2: 'Текст 1'},
                            {text1: 'Строка 2', text2: 'Текст 2'},
                            {text1: 'Строка 3', text2: 'Текст 3'},

                        ],
                        french: [
                            {head1: 'Gros titre 1', head2: 'Gros titre 2'},
                            {text1: 'Ligne 1', text2: 'Texte 1'},
                            {text1: 'Ligne 2', text2: 'Texte 2'},
                            {text1: 'Ligne 3', text2: 'Texte 3'},

                        ],
                        english: [
                            {head1: 'Head 1', head2: 'Head 2'},
                            {text1: 'Line 1', text2: 'Text 1'},
                            {text1: 'Line 2', text2: 'Text 2'},
                            {text1: 'Line 3', text2: 'Text 3'},

                        ],
                        italian: [
                            {head1: 'Titolo 1', head2: 'Titolo 2'},
                            {text1: 'Linea 1', text2: 'Testo 1'},
                            {text1: 'Linea 2', text2: 'Testo 2'},
                            {text1: 'Linea 3', text2: 'Testo 3'},

                        ],
                    }}
                />
            </h1>
            <a href='https://github.com/6AHK0MAT/ru-en' target='_blank'>Ссылка на данный проект в GitHub</a>
        </div>
    </LanguageProvider>
);

render(<App/>, document.getElementById("root"));
