import { useState, useEffect } from "react";

function UseEventSearch(){
  // state changes to reflect changing states
  const [events, setEvents] = useState([]);
  // event lifetime for caching results in browser
  useEffect(() =>{
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  // call api endpoints
  const search = async(q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({q})
    );
    const data = await response.json();
    setEvents(data);

    localStorage.setItem('lastQuery', q);
  };
  return {search, events};
}
function App() {
  const { search, events } = UseEventSearch();

  return (
    <main>
      <h1>Bulletin Board</h1>
      <input 
        type="text"
        placeholder="Search"
        onChange={(e)=> search(e.target.value)}
      />
      <ul>
        {events.map((event)=>(
          <Event key={event.id} {...event}/>
        ))}

        {events.length === 0 && 'No events found'}
      </ul>
    
    </main>
  )
}

function Event({name, date, age}){
  return (
    <li>
      <strong>{name}</strong> {date} ({age} years old)
    </li>
  )
}
export default App
