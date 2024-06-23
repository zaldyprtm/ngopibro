

const About = () => {
    return (
        <>
        <div className="mb-20 rounded-2xl mt-10">
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl">
                <h1 className="md:p-6 p-8 text-center font-bold text-2xl text-white uppercase underline-animation">About Us</h1>
                
                <div className="md:flex md:flex-row md:w-[80%] mx-auto gap-[200px]">
                    <img src="Bubble.gif" alt="gif" 
                    className="w-80 mt-10 md:mt-8 mx-auto"
                    />

                    <p className="md:mt-24 text-black md:text-lg mt-5 font-semibold p-7 text-sm text-wrap text-center">Nikmati cita rasa kopi terbaik dengan suasana yang nyaman. Kami berkomitmen untuk menghadirkan pengalaman ngopi yang tak terlupakan dengan biji kopi pilihan dan pelayanan istimewa. Bersantailah di tempat kami, rasakan aroma dan kenikmatan kopi yang diseduh dengan penuh cinta</p>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default About;