import React, { useState } from "react";

const useInput = (initialValue) => {
  const [value, set] = useState(initialValue);
  return { value, onChange: (e) => set(e.target.value) };
};

function Top() {
  const firstName = useInput("");
  const lastName = useInput("");
  return (
    <div>
      <input type="text" {...firstName} />
      <input type="text" {...lastName} />
    </div>
  );
}

export default Top;
