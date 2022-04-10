import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listofColors, setListOfColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getColors").then((response) => {
      setListOfColors(response.data);
    });
  }, []);

  const createColor = (e) => {
    e.preventDefault();
    if(colorName.length > 0 && colorHex.length > 0) {
      Axios.post("http://localhost:3001/createColor", {
        colorName,
        colorHex,
      }).then(() => {
        Axios.get("http://localhost:3001/getColors").then((response) => {
          setListOfColors(response.data);
          const inputs = document.querySelector('#colorForm').childNodes;
          inputs.forEach(input => {
            input.value = '';
          });
        });
      });
    } else throw Error("Both input fields require at least one character")
  };

  const deleteColor = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setListOfColors(
        listofColors.filter((color) => {
          return color._id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="colorInput">
        <form onSubmit={createColor} id="colorForm">
          <input
            type="text"
            placeholder="Color name"
            required
            onChange={(event) => {
              setColorName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Hexa value"
            required
            onChange={(event) => {
              setColorHex(event.target.value);
            }}
          />
          <button type="submit">Create color</button>
        </form>
      </div>
      <div className="colorDisplay">
        {listofColors.map((color) => {
          return (
            <div className="color" key={color.colorName}>
              <div>
                <h1 style={{ color: `${color.colorHex}` }}>
                  Name: {color.colorName}
                </h1>
                <h1 style={{ color: `${color.colorHex}` }}>
                  Hex value: {color.colorHex}
                </h1>
              </div>
              <button onClick={() => deleteColor(color._id)}>
                Delete color
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
