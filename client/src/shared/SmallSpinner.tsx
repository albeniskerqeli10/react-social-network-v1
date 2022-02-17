const SmallSpinner = () => {
    return(
        <div className="flex justify-center items-center">
        <div className="relative w-20 h-20 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-primary to-red-400 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-light-primary rounded-full border-2 border-white"></div>
        </div>
    </div>
    )
  }
  
  export default SmallSpinner;