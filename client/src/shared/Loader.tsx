const Loader = () => {
  return(
    // <div className="w-full h-screen z-10 flex flex-row items-center justify-center flex-wrap">
    // <AiOutlineLoading3Quarters color="#4F46E5" className="animate-spin" size={50}/>
    // </div>
    <div className="flex justify-center items-center h-screen">
    <div className="relative w-20 h-20 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-primary to-red-400 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-light-primary rounded-full border-2 border-white"></div>
    </div>
</div>

  )
}

export default Loader;