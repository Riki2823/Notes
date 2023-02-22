import Nav from "./Nav"


export default function Home(){
    const token = localStorage.getItem("token");
    return(
        <div>
            <Nav/>
            <h1>
                TestHome
            </h1>
        </div>
    )
}