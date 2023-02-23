import Nav from "./Nav"


export default function Home(){
    const token = localStorage.getItem("token");
    if(token == null){
        window.location.replace("/");
    } else{
        return(
            <div>
                <Nav/>
                <h1>
                    TestHome
                </h1>
            </div>
        )
    }
    
}