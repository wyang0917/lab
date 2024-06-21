import { useState, useEffect } from "react";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { v4 as uuid } from "uuid";

function Notes() {
  //states
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // add new note to the state array
  const saveHandler = () => {
    //如果需要在更新state时参考之前的state，可以在调用setState函数时传入一个回调函数作为参数。这个回调函数会接收到之前的状态值作为参数，并返回新的状态值
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText
      }
    ]);
    //clear the textarea
    setInputText("");
  };

  //delete note function
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  //apply the save and get functions using useEffect
  //get the saved notes and add them to the array
  useEffect(() => {
    //if can't find then return null from localStorage
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (Array.isArray(data) && data.length > 0) {
      console.log("test1");
      setNotes(data);
    }
    setLoading(false); // Set loading to false after retrieving notes
  }, []);

  //saving data to local storage
  useEffect(() => {
    if (!loading) {
      console.log("test2");

      // Check if loading is false before saving to local storage
      localStorage.setItem("Notes", JSON.stringify(notes));
    }
  }, [notes, loading]);
  if (loading) {
    return <div>Loading...</div>; // Display a loading state while retrieving notes
  }

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          deleteNote={deleteNote}
        />
      ))}
      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
      />
    </div>
  );
}

export default Notes;
