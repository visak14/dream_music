import dream from "./assets/DreamMusic.png";
import tunelogo from "./assets/Logo.png";
import home from "./assets/Vector (1).png";
import trends from "./assets/Vector (3).png";
import discover from "./assets/Vector (4).png";
import setting from "./assets/Settings.png";
import logout from "./assets/Log Out.png";
import search from "./assets/Vector (5).png";
import background from "./assets/Background.png";
import mic from "./assets/Michael.png";
import ver1 from "./assets/Verified Artist.png";
import ver2 from "./assets/Verified.png";
import mpic from "./assets/Pic.png";
import play from "./assets/Play.png";
import next from "./assets/Vector.png";
import back from "./assets/Back.png";
import repeats from "./assets/Repeat.png";
import sync from "./assets/dww.png";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPause } from "react-icons/fa";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const wrapperRef = useRef(null);
  const [sound, setSound] = useState(null);
  const [draggedSongIndex, setDraggedSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [repeat, setRepeat] = useState(false);

  const fetchSongs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/song/list");
      const songData = response.data.data;
      setSongs(songData);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };
console.log(songs)
  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handleEnded = () => {
        nextSong();
      };
      audioElement.addEventListener("ended", handleEnded);
      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioRef, currentSongIndex, songs]);

  const playSong = (index) => {
    if (index < 0 || index >= songs.length) return;

    const song = songs[index];

    if (!song || !song.file) {
      console.error("Invalid song or missing file:", song);
      return;
    }

    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.src = `http://localhost:4000/songs/${song.file}`;
      audioElement.play();
      setIsPlaying(true);
      setCurrentSongIndex(index);
    }
  };

  const pauseSong = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    playSong(nextIndex);
  };

  const prevSong = () => {
    let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    playSong(prevIndex);
  };

  const syncSong = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime = 0; 
      setCurrentTime(0); 
      if (isPlaying) {
        audioElement.play(); 
      }
    }
  };

  const toggleRepeat = () => {
    setRepeat((prevRepeat) => !prevRepeat);
  };

  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      setCurrentTime(audioElement.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      setDuration(audioElement.duration);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const onDragStart = (index) => {
    setDraggedSongIndex(index);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, index) => {
    event.preventDefault();
    const newSongs = [...songs];
    const draggedSong = newSongs[draggedSongIndex];
    newSongs.splice(draggedSongIndex, 1);

    newSongs.splice(index, 0, draggedSong);

    setSongs(newSongs);
    setDraggedSongIndex(null);
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#290909] text-white ">
        <aside className="bg-[#0E0E0E] text-white w-[25%] h-full hidden lg:block">
          <div className="p-10 text-center flex justify-between ">
            <div>
              <img src={tunelogo} alt="Artist" className="rounded-lg " />
            </div>
            <div>
              <img src={dream} alt="Artist" />
            </div>
          </div>
          <nav className="mt-10 p-10 flex flex-col justify-between h-[80vh]">
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 hover:text-red-500">
                <i className="fas fa-home"></i>
                <span>MENU</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-red-500">
                <img
                  src={home}
                  alt="Home Icon"
                  className="rounded-lg h-5 w-5"
                />
                <span>Home</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-red-500">
                <img
                  src={trends}
                  alt="Trends Icon"
                  className="rounded-lg h-5 w-5"
                />
                <span>Trends</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-red-500">
                <img
                  src={tunelogo}
                  alt="Library Icon"
                  className="rounded-lg h-5 w-5"
                />
                <span>Library</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-red-500">
                <img
                  src={discover}
                  alt="Discover Icon"
                  className="rounded-lg h-5 w-5"
                />
                <span>Discover</span>
              </li>
            </ul>
            <ul className="space-y-4 -bottom-15">
              <li className="flex items-center space-x-2 hover:text-red-500">
                <span>General</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-red-500">
                <img
                  src={setting}
                  alt="Settings Icon"
                  className="rounded-lg h-5 w-5"
                />
                <span>Settings</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-red-500">
                <img
                  src={logout}
                  alt="Logout Icon"
                  className="rounded-lg h-5 w-5"
                />
                <span>Log Out</span>
              </li>
            </ul>
          </nav>
        </aside>

        <div className=" w-[100%] lg:w-[80%]   h-[10vh%] bg-[linear-gradient(180deg,_#4C0000_0%,_#0A0A0A_100%),_linear-gradient(90deg,_rgba(0,_0,_0,_0)_73.01%,_rgba(15,_15,_15,_0.6)_73.01%)]">
          <header className="p-4 md:py-10 md:gap-4 lg:px-40 lg:py-10 flex justify-between items-center">
            <nav className="flex space-x-4 md:space-x-8 text-sm md:text-base">
              <a href="#" className="hover:text-red-500">
                Music
              </a>
              <a href="#" className="hover:text-red-500">
                Podcast
              </a>
              <a href="#" className="hover:text-red-500">
                Live
              </a>
              <a href="#" className="hover:text-red-500">
                Radio
              </a>
            </nav>
            <div className="relative w-full max-w-md mx-auto md:w-32 lg:w-full ">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#2C0000] text-white py-2 px-4 md:px-8 rounded-full pl-10 focus:outline-none w-full"
              />
              <i className="fas fa-search absolute right-3 top-2 md:top-3 text-white">
                <img
                  src={search}
                  alt="Search Icon"
                  className="rounded-lg h-5 w-5"
                />
              </i>
            </div>
          </header>
         
          <main className="p-14 lg:px-40 lg:py-10 grid gap-10 md:gap-10 md:py-0">
            <section className="space-y-6">
              <div className="relative">
                <img
                  src={background}
                  alt="Michael Jackson"
                  className="w-full rounded-lg shadow-lg object-cover h-56 md:h-72 lg:h-80"
                />
                <div className="absolute bottom-16 left-4 space-y-2">
                  <div className="flex gap-4">
                    <img src={ver2} alt="Verified" className="h-5 w-5" />
                    <img
                      src={ver1}
                      alt="Verified Artist"
                      className="h-2 align-middle my-2"
                    />
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold">
                    {songs[currentSongIndex]?.name}
                  </h1>
                  <p className="text-gray-300">
                
                    {songs[currentSongIndex]?.listeners} monthly listeners
                  </p>
                </div>
                <div className="absolute bottom-16 right-5 space-y-2">
                  <img
                    src={mic}
                    alt="Mic"
                    className="w-full rounded-lg shadow-lg object-cover h-56 md:h-64 lg:h-80"
                  />
                </div>
              </div>
              <div className="space-y-20">
                <h2 className="text-xl md:text-2xl font-semibold">Popular</h2>
                <div className=" h-48 overflow-y-auto custom-scrollbar ">
                  <table
                    className="w-full table-fixed  "
                    onDragOver={onDragOver}
                    ref={wrapperRef}
                  >
                    <thead className=" top-0 sticky bg-[#2C0000]">
                      <tr className="text-left">
                        <th className="w-8">#</th>
                        <th className="w-1/3 hidden md:table-cell">TITLE</th>
                        <th className="w-3/5 ">PLAYING</th>
                        <th className="w-24">TIME</th>
                        <th className="w-1/2  mx-10 hidden lg:table-cell">
                          ALBUM
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {songs.length > 0 ? (
                        songs.map((song, index) => (
                          <tr
                            key={song._id}
                            className="hover:bg-red-500 cursor-pointer"
                            onClick={() => playSong(index)}
                            draggable
                            onDragStart={() => onDragStart(index)}
                            onDrop={(event) => onDrop(event, index)}
                          >
                            <td>{index + 1}</td>
                            <td className="truncate hidden md:table-cell">
                              <span className="ml-2">{song.name}</span>
                            </td>
                            <td className="">{song.file}</td>
                            <td className="">{formatTime(duration)}</td>
                            <td className="hidden lg:table-cell">
                              {song.description}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No songs available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className=" lg:hidden">
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-1">
                    {songs[currentSongIndex]?.name || "Song Name"}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {songs[currentSongIndex]?.description ||
                      "Artist Description"}
                  </p>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  <div className="w-full bg-gray-600 h-1 rounded-full">
                    <div
                      className="bg-white h-1 rounded-full"
                      style={{
                        width: duration
                          ? `${(currentTime / duration) * 100}%`
                          : "0%",
                      }}
                    ></div>
                  </div>

                  <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                  />
                </div>

                <div className="mt-4 flex justify-around items-center text-xl">
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={toggleRepeat}
                  >
                    <img src={repeats} alt="Repeat" className="h-5 w-5" />
                  </button>

                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={prevSong}
                  >
                    <img src={back} alt="Previous" className="h-5 w-5" />
                  </button>

                  <button
                    className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
                    onClick={
                      isPlaying ? pauseSong : () => playSong(currentSongIndex)
                    }
                  >
                    {isPlaying ? (
                      <FaPause className="h-5 w-5" />
                    ) : (
                      <img src={play} alt="Play" className="h-5 w-5" />
                    )}
                  </button>

                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={nextSong}
                  >
                    <img src={next} alt="Next" className="h-5 w-5" />
                  </button>

                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={syncSong}
                  >
                    <img src={sync} alt="Sync" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
        <aside className="bg-[#0E0E0E] text-white w-[25%] mx-10   h-full my-auto mb-16  hidden lg:block">
          <div className="bg-[#4C0000] text-white rounded-lg p-5 shadow-lg max-w-sm">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Now Playing</h3>
            </div>

            <div className="flex justify-center mb-4">
              <img
                src={songs[currentSongIndex]?.image}
                alt={songs[currentSongIndex]?.name}
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>

            <div className="text-center">
              <h4 className="text-xl font-bold mb-1">
                {songs[currentSongIndex]?.name}
              </h4>
              <p className="text-sm text-gray-400">
                {songs[currentSongIndex]?.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="w-full bg-gray-600 h-1 rounded-full">
                <div
                  className="bg-white h-1 rounded-full"
                  style={{
                    width: duration
                      ? `${(currentTime / duration) * 100}%`
                      : "0%",
                  }}
                ></div>
              </div>

              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </div>

            <div className="mt-4 flex justify-around items-center text-xl">
              <button
                className="text-gray-400 hover:text-white"
                onClick={toggleRepeat}
              >
                <img src={repeats} alt="Repeat" className="h-5 w-5" />
              </button>

              <button
                className="text-gray-400 hover:text-white"
                onClick={prevSong}
              >
                <img src={back} alt="Previous" className="h-5 w-5" />
              </button>

              <button
                className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
                onClick={
                  isPlaying ? pauseSong : () => playSong(currentSongIndex)
                }
              >
                {isPlaying ? (
                  <FaPause className="h-5 w-5" />
                ) : (
                  <img src={play} alt="Play" className="h-5 w-5" />
                )}
              </button>

              <button
                className="text-gray-400 hover:text-white"
                onClick={nextSong}
              >
                <img src={next} alt="Next" className="h-5 w-5" />
              </button>

              <button
                className="text-gray-400 hover:text-white"
                onClick={syncSong}
              >
                <img src={sync} alt="Sync" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default App;
