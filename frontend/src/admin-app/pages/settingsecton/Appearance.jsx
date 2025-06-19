import { useState, useEffect } from "react";

const applyNightLightEffect = (enabled) => {
  if (enabled) {
    document.documentElement.style.filter = "brightness(85%) sepia(30%)";
  } else {
    document.documentElement.style.filter = "";
  }
};

const applyFontSizeEffect = (size) => {
  document.documentElement.style.fontSize =
    size === "small" ? "14px" : size === "large" ? "18px" : "16px";
};

const savedNightLight = JSON.parse(localStorage.getItem("nightLight")) || false;
const savedFontSize = localStorage.getItem("fontSize") || "medium";
applyNightLightEffect(savedNightLight); // Run once when app loads
applyFontSizeEffect(savedFontSize); // Apply font size globally on load

const Appearance = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(savedFontSize);
  const [nightLight, setNightLight] = useState(savedNightLight);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    applyFontSizeEffect(fontSize); // Apply font size globally
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    applyNightLightEffect(nightLight); // Ensure Night Light is applied globally
    localStorage.setItem("nightLight", JSON.stringify(nightLight));
  }, [nightLight]);

  return (
    <div className="max-w-5xl mx-1 bg-white dark:bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-800">
        Appearance
      </h2>
      <p className="text-gray-500 dark:text-gray-800">
        Customize how the application looks and feels
      </p>

      {/* Theme Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-800">
          Theme
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <button
            onClick={() => {
              setTheme("light");
              setNightLight(false); // Always disable night light when light is selected
            }}
            className={`p-4 border rounded-lg ${
              !nightLight ? "bg-gray-200 dark:bg-gray-300" : ""
            }`}
          >
            Light
          </button>
          <button
            onClick={() => {
              setNightLight(true);
            }}
            className={`p-4 border rounded-lg ${
              nightLight ? "bg-gray-200 dark:bg-gray-300" : ""
            }`}
          >
            Night Light
          </button>
        </div>
      </div>

      {/* Font Size Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-800">
          Font Size
        </h3>
        <div className="flex space-x-4 mt-2">
          {["small", "medium", "large"].map((size) => (
            <label
              key={size}
              className="flex items-center space-x-2 text-gray-900 dark:text-gray-800"
            >
              <input
                type="radio"
                name="fontSize"
                value={size}
                checked={fontSize === size}
                onChange={() => setFontSize(size)}
              />
              <span className="capitalize">{size}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appearance;
