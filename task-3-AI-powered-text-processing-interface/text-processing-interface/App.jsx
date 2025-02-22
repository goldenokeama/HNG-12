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
  const [translateLoad, setTranslateLoad] = React.useState(false);

  const [summary, setSummary] = React.useState("");
  const [summaryLoad, setSummaryLoad] = React.useState(false);
  const [isTranslateDisabled, setTranslateDisabled] = React.useState(false);
  const [isSummaryDisabled, setSummaryDisabled] = React.useState(false);

  const inputtedTextRef = React.useRef(null);

  const selectLang = {
    pt: "Portuguese",
    es: "Spanish",
    ru: "Russian",
    tr: "Turkish",
    fr: "French",
    en: "English",
  };

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "projectDetail") {
      setInputText(value);
    }
    if (name === "translated") {
      setTranslatedLangTag(value);
      setTranslatedText("");
    }
  }

  function handleSend() {
    callInitializeLanguageDetector();
    console.log("displaying now...");
    setDisplayedText(inputText);

    setTimeout(() => {
      inputtedTextRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleTranslate() {
    if (translatedLangTag && inputTextTag) {
      setTranslatedText("");
      console.log("calling translator...");
      setTranslateLoad(true);
      callInitializeLanguageTranslator();
      setTranslateDisabled(true);
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
    const { translatorAvailable } = await initializeLanguageTranslator();
    // console.log(translatorCapabilities.languagePairAvailable("en", "es"));

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

      setTranslateLoad(false);

      setTranslateDisabled(false);
    }
  }

  const options = {
    sharedContext: "This is a scientific article",
    type: "key-points",
    format: "markdown",
    length: "medium",
  };

  async function callSummarizer() {
    const available = (await self.ai.summarizer.capabilities()).available;
    let summarizer;
    if (available === "no") {
      // The Summarizer API isn't usable.
      return;
    }
    if (available === "readily") {
      // The Summarizer API can be used immediately .
      summarizer = await self.ai.summarizer.create(options);
    } else {
      // The Summarizer API can be used after the model is downloaded.
      summarizer = await self.ai.summarizer.create(options);
      summarizer.addEventListener("downloadprogress", (e) => {
        console.log(e.loaded, e.total);
      });
      await summarizer.ready;
    }

    // console.log(summarizer);
    const longText = inputText.length > 150 ? inputText : "";

    const summary = await summarizer.summarize(longText, {
      context: "This article is intended for a tech-savvy audience.",
    });
    // console.log("summary: ", summary);

    const formattedText = summary.replace(/ \*/g, "\n*");

    // console.log("formattedSummary: ", formattedText);

    setSummary(formattedText);
    setSummaryLoad(false);
    setSummaryDisabled(false);
  }

  function handleSummarize() {
    console.log("calling summarize...");
    setSummaryLoad(true);
    setSummaryDisabled(true);
    callSummarizer();
  }

  return (
    <div className="container">
      <header>
        <h2>AI-Powered Text Processing Interface</h2>
      </header>
      <div ref={inputtedTextRef}></div>
      <div className="output-field">
        <h3>Text Inputted</h3>
        <hr />
        {displayedText && <p>👉 {displayedText}</p>}
        {/* render the language detected here */}
        {language && (
          <span className="language">{language} language detected</span>
        )}
      </div>

      <br />

      <div className="translated-text">
        <h4>Tanslated Text Goes Here</h4>
        <hr />
        {translatedText && (
          <h4>Translated to {selectLang[translatedLangTag]}</h4>
        )}
        {translateLoad && <p>Loading translation...</p>}
        <br />
        {translatedText && <p>👉 {translatedText}</p>}
      </div>
      <br />
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
      <button
        disabled={isTranslateDisabled}
        style={{
          backgroundColor: isTranslateDisabled && "#ccc",
          color: isTranslateDisabled && "#666",
          cursor: isTranslateDisabled && "not-allowed",
        }}
        onClick={handleTranslate}
      >
        Translate
      </button>

      <br />
      <br />
      <div className="summerizer">
        <h4>Summary Goes Here 👇</h4>
        <hr />
        {summary && <div>{summary}</div>}
        {summaryLoad && <p>Generating summary please wait...</p>}

        {inputText.length > 150 && language === "English" && (
          <button
            onClick={handleSummarize}
            disabled={isSummaryDisabled}
            style={{
              backgroundColor: isSummaryDisabled && "#ccc",
              color: isSummaryDisabled && "#666",
              cursor: isSummaryDisabled && "not-allowed",
            }}
          >
            Summarize
          </button>
        )}
      </div>

      <br />

      <div className="input-text-container">
        <label>
          <textarea
            name="projectDetail"
            placeholder="Input a text..."
            value={inputText}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}
