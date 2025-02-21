export async function initializeLanguageDetector() {
  try {
    const capabilities = await self.ai.languageDetector.capabilities();

    const capabilitiesAvailable = capabilities.available;

    if (capabilitiesAvailable === "no") {
      console.error("Language Detector is not available.");
      return "Language detector is not available.";
    }

    if (capabilitiesAvailable === "readily") {
      // The language detector can immediately be used.
      const detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded detector ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });

      return detector;
    }

    if (capabilitiesAvailable === "after-download") {
      // Language detector is already downloaded. Just create it.
      return "You need to download the language detector model first.";
    }
  } catch (error) {
    console.error(
      "Error checking capabilities or creating Language Detector:",
      error
    );
  }
}

export async function initializeLanguageTranslator() {
  const translatorCapabilities = await self.ai.translator.capabilities();

  if (translatorCapabilities.available === "readily") {
    return { translatorAvailable: "readily", translatorCapabilities };
  }
}
