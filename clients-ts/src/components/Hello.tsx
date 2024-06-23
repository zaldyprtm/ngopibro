import { TypeAnimation } from "react-type-animation";

const Hello = () => {
  return (
    <>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          "Selamat Datang di Ngopi Bro!",
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          "Gass ngopi disini brayyy",
          1000,

        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: "2em", display: "inline-block" }}
        repeat={Infinity}
        className="text-orange-500 font-bold"
      />
    </>
  );
};

export default Hello;
