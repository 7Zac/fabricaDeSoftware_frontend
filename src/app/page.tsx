import Image from "next/image";
import Login from "./components/login";


const Dashboard = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-6">
      <Image
            alt="Logomarca"
            src="./Logo.svg"
            width= "140"
            height= "140"
            />
      <Login/>
    </div>
  )
}

export default Dashboard;