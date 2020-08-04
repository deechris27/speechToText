import React, { useState, useEffect } from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-IN';

const handleSaveNote = (setSavedNotes, savedNotes, note) => {
    setSavedNotes([...savedNotes, note]);
};

const handleListening = (isListening, setNote) => {
    if (isListening) {
        mic.start();
        mic.onend = () => {
            console.log('Don\'t stop on a pause...');
            mic.start();
        }
    } else {
        mic.stop();
        mic.onend = () => {
            console.log("Stop...")
        }
    }

    mic.onstart = () => {
        console.log('Mics on..');
    };

    mic.onresult = event => {

        const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
        setNote(transcript);

        mic.onerror = event => {
            console.log(event.error)
        };
    }
};

function App() {
    const [isListening, setIsListening] = useState(true);
    const [note, setNote] = useState(null);
    const [savedNotes, setSavedNotes] = useState([]);

    useEffect(() => {
        handleListening(isListening, setNote)
        if(!mic){
            setIsListening(false)
        }
    }, [isListening]);

    return (
        <React.Fragment>
            <h1 style={{textAlign: 'center', color: 'orange'}}>Mytidbit Speech to Text App</h1>
            <span style={{textAlign: 'center', fontSize: '12px', position: 'relative', left:'40%', fontWeight: 'bold'}}>Allow access to microphone and speak something in english</span>
            <div style={{textAlign: 'center', fontSize: '50px'}}>{isListening ? <span>&#127908;</span> : <span>&#128308;</span>}</div>
            <div className="container">
                <div className="box">
                    <h2>Speech</h2>
                    <button onClick={() => handleSaveNote(setSavedNotes, savedNotes, note)} disabled={!note} style={{position: "relative", bottom:'60px'}}>Save Note</button>
                    <p>{note}</p>
                </div>
                
                <div className="box">
                    <h2>Saved Text </h2>
                    {savedNotes.map(n => (
                        <p key={n}>{n}</p>
                    ))}
                </div>
            </div>
        </React.Fragment>)
}

export default App;

