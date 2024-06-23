import Hello from "./Hello";

const Hero = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200 md:mt-8 mt-28 " style={{backgroundImage: 'url("https://img.freepik.com/free-photo/fresh-coffee-steams-wooden-table-close-up-generative-ai_188544-8923.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719014400&semt=ais_user")'}}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="/hero.png"
            className="md:max-w-sm w-64 rounded-2xl md:rounded-lg shadow-2xl
             duration-200 hover:shadow-amber-400
            "
          />
          <div className="p-10">
            <Hello />
            <p className="py-6 text-white">
            Nikmati cita rasa kopi terbaik dengan suasana yang nyaman. Kami berkomitmen untuk menghadirkan pengalaman ngopi yang tak terlupakan dengan biji kopi pilihan dan pelayanan istimewa. Bersantailah di tempat kami, rasakan aroma dan kenikmatan kopi yang diseduh dengan penuh cinta
            </p>
            <button className="btn hover:opacity-50 bg-orange-500 text-white font-bold">Gass Ngopi</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
