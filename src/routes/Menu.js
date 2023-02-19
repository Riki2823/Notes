export default function Test(){
    
    const a = localStorage.getItem("token");
    return(
        <h1>Default en el test
            
            {a}
        </h1>
        
    );
}