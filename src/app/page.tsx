import Image from "next/image";
import Login from "./components/login";


const Dashboard = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image
            alt="Logomarca"
            src="./Logo.svg"
            width= "100"
            height= "100"
            />
      <Login/>
    </div>
  )
}

export default Dashboard;