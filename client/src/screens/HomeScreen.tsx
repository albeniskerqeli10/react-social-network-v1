
import Feed from "@components/Feed";
import LeftSidebar from "@components/Sidebar/LeftSidebar";
import RightSidebar from "@components/Sidebar/RightSidebar";

const HomeScreen: React.FC  = () => {

  return (
      <main className="w-full min-h-[80vh]  gap-2 flex  flex-1 lg:flex-none flex-row justify-start  md:mt-20 flex-wrap items-center">
      <div className="container mx-auto lg:gap-2  gap-1  flex flex-row items-start mt-20 xl:mt-5  justify-center md:justify-evenly   flex-wrap md:flex-nowrap "> 

        <LeftSidebar/>
        <Feed/>
        <RightSidebar/>
        </div>
      </main>
  )
}

export default HomeScreen
