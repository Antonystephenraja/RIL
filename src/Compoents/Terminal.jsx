import React, { useEffect, useRef } from "react";

const Terminal = ({ output }) => {
  const terminalRef = useRef(null);

  useEffect(() => {

   if (terminalRef.current) {
    terminalRef.current.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth", 
    });
  }
  }, [output]);


  // console.log("output=",output)
  return (
    <div
      ref={terminalRef}
      className="h-[100%] w-full bg-black p-4 rounded-md overflow-y-auto"style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#ffffff transparent",
                    }}
    >
      {output.map((line, index) => (
        <div
          key={index}
          className={
            line.type === "Error"? "text-red-400 text-[11px] md:text-[13px] 2xl:text-[18px]": line.type === "error"? "text-yellow-400":"text-green-400 text-[11px] md:text-[13px] 2xl:text-[18px]"
          }
        >
          {line.type === "command" ? `> ${line.text}` : `> ${line.text}`}
        </div>
      ))}
    </div>
  );
};

export default Terminal;
