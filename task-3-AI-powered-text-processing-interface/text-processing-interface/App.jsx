import React from "react";
import {
  initializeLanguageDetector,
  initializeLanguageTranslator,
} from "./api";

export default function App() {
  const [inputText, setInputText] = React.useState("");
  const [inputTextTag, setInputTextTag] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [displayedText, setDisplayedText] = React.useState("");
  const [translatedLangTag, setTranslatedLangTag] = React.useState("");
  const [translatedText, setTranslatedText] = React.useState("");

  const [displayTranslatedText, setDisplayTranslatedLang] =
    React.useState(false);

  const selectLang = {
    pt: "Portuguese",
    es: "Spanish",
    ru: "Russian",
    tr: "Turkish",
    fr: "French",
  };

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "projectDetail") {
      setInputText(value);
    }
    if (name === "translated") {
      setTranslatedLangTag(value);
    }
  }

  function handleSend() {
    callInitializeLanguageDetector();
    console.log("displaying now...");
    setDisplayedText(inputText);
  }

  function handleTranslate() {
    if (translatedLangTag && inputText) {
      console.log("calling translator...");
      callInitializeLanguageTranslator();
    }
  }

  const languageTagToHumanReadable = (languageTag, targetLanguage) => {
    const displayNames = new Intl.DisplayNames([targetLanguage], {
      type: "language",
    });
    return displayNames.of(languageTag);
  };

  async function callInitializeLanguageDetector() {
    const detector = await initializeLanguageDetector();

    if (typeof detector === "object") {
      console.log(detector);

      const { detectedLanguage } = (await detector.detect(inputText.trim()))[0];

      const humanReadableLanguage = languageTagToHumanReadable(
        detectedLanguage,
        "en"
      );
      setInputTextTag(detectedLanguage);
      setLanguage(humanReadableLanguage);
    } else {
      // show something when the model is not available
      console.log(detector);
    }
  }

  async function callInitializeLanguageTranslator() {
    const { translatorAvailable, translatorCapabilities } =
      await initializeLanguageTranslator();
    console.log(translatorCapabilities.languagePairAvailable("en", "es"));

    if (translatorAvailable === "readily") {
      // Creating a translator that translates from one language (sourceLanguage) to another (targetLanguage)
      const translator = await self.translation.createTranslator({
        sourceLanguage: inputTextTag.trim(),
        targetLanguage: translatedLangTag.trim(),
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });

      // console.log(translator);
      const translatedText = await translator.translate(inputText.trim());
      // console.log(translatedText);
      setTranslatedText(translatedText);
      setDisplayTranslatedLang(true);
    }
  }

  return (
    <div className="container">
      <div className="output-field">
        {displayedText && <p>{displayedText}</p>}
        {/* render the language detected here */}
        {language && <button>{language}</button>}
      </div>

      <div className="translated-text">
        <p>
          Translated to
          {translatedText ? selectLang[translatedLangTag] : "..."}
        </p>
        <hr />
        {translatedText ? "Loading..." : <p>{translatedText}</p>}
      </div>

      <label htmlFor="translated">Choose a language to translate to</label>
      <select
        id="translated"
        value={translatedLangTag}
        onChange={handleChange}
        name="translated"
      >
        <option value="">-- Select a Language--</option>
        <option value="en">English</option>
        <option value="pt">Portuguese</option>
        <option value="es">Spanish</option>
        <option value="ru">Russian</option>
        <option value="tr">Turkish</option>
        <option value="fr">French</option>
      </select>
      <button onClick={handleTranslate}>Translate</button>

      <div className="input-text-container">
        <label>
          <textarea
            name="projectDetail"
            placeholder="Input a text..."
            value={inputText}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
