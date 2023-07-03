import React, { useEffect, useState } from "react";

export default function plumhq() {
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 20
      );
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(0);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div>
        <button
          className="py-2 px-4 bg-green-500 rounded-full"
          onClick={() => setIsButtonClick(true)}
        >
          Hit Me!
        </button>
        ;
      </div>
      {isButtonClick && (
        <div>
          <div>Loading...</div>
          <div>
            <div
              style={{
                width: `${loadingProgress}%`,
                height: "10px",
                backgroundColor: "blue",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
