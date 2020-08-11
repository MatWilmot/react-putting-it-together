import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import TranslationInput from "./components/TranslationInput";
import TranslationList from "./components/TranslationList";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [translation, setTranslation] = useState({
    text: "",
    translationList: [],
  });

  const editText = (e) => {
    setTranslation({ ...translation, [e.target.name]: e.target.value });
    console.log(translation);
  };

  const submitText = (e) => {
    e.preventDefault();

    translate(translation.text).then((res) => {
      setTranslation({
        ...translation,
        translationList: [...translation.translationList, res],
      });
    });
  };

  const translate = (originalText) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: "https://yodish.p.rapidapi.com/yoda.json",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "x-rapidapi-host": "yodish.p.rapidapi.com",
          "x-rapidapi-key":
            "3374509cc5mshbbad869e8299c36p173257jsna2a76f880e58",
          useQueryString: true,
        },
        params: {
          text: originalText,
        },
        data: {},
      })
        .then((response) => {
          resolve(response.data.contents.translated);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // useEffect(() => {
  //   translate("watch out obi wan").then((res) => console.log(res));
  // }, []);

  return (
    <div className="App">
      <div className="container jumbotron rounded-0">
        <TranslationInput submitText={submitText} editText={editText} />
      </div>

      <TranslationList translationList={translation.translationList} />
    </div>
  );
}

export default App;
