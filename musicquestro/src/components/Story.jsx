import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import backBtn from '/src/assets/game-assets/Assets/Buttons/Back.png';
import arrowDown from '../assets/game-assets/AppAssets/arrowDown.png';
import { UserContext } from './CurrentUserContext';
import '../styles/Story.css';


import slide1 from "/src/assets/game-assets/Stories/1.png"
import slide2 from "/src/assets/game-assets/Stories/2.png"
import slide3 from "/src/assets/game-assets/Stories/3.png"
import slide4 from "/src/assets/game-assets/Stories/4.png"
import slide5 from "/src/assets/game-assets/Stories/5.png"
import slide6 from "/src/assets/game-assets/Stories/6.png"
import slide7 from "/src/assets/game-assets/Stories/7.png"
import slide8 from "/src/assets/game-assets/Stories/8.png"
import slide9 from "/src/assets/game-assets/Stories/9.png"
import slide10 from "/src/assets/game-assets/Stories/10.png"
import slide11 from "/src/assets/game-assets/Stories/11.png"
import slide12 from "/src/assets/game-assets/Stories/12.png"
import slide13 from "/src/assets/game-assets/Stories/13.png" //rhythm game
import slide14 from "/src/assets/game-assets/Stories/14.png"
import slide15 from "/src/assets/game-assets/Stories/15.png"
import slide16 from "/src/assets/game-assets/Stories/16.png"
import slide17 from "/src/assets/game-assets/Stories/17.png"
import slide18 from "/src/assets/game-assets/Stories/18.png" //After rhythm game
import slide19 from "/src/assets/game-assets/Stories/19.png"
import slide20 from "/src/assets/game-assets/Stories/20.png"
import slide21 from "/src/assets/game-assets/Stories/21.png"
import slide22 from "/src/assets/game-assets/Stories/22.png" //end of rhtyhm
import slide23 from "/src/assets/game-assets/Stories/23.png" //Melody game
import slide24 from "/src/assets/game-assets/Stories/24.png"
import slide25 from "/src/assets/game-assets/Stories/25.png"
import slide26 from "/src/assets/game-assets/Stories/26.png"
import slide27 from "/src/assets/game-assets/Stories/27.png"
import slide28 from "/src/assets/game-assets/Stories/28.png"
import slide29 from "/src/assets/game-assets/Stories/29.png"
import slide30 from "/src/assets/game-assets/Stories/30.png"
import slide31 from "/src/assets/game-assets/Stories/31.png"
import slide32 from "/src/assets/game-assets/Stories/32.png"
import slide33 from "/src/assets/game-assets/Stories/33.png"
import slide34 from "/src/assets/game-assets/Stories/34.png"
import slide35 from "/src/assets/game-assets/Stories/35.png"
import slide36 from "/src/assets/game-assets/Stories/36.png"
import slide37 from "/src/assets/game-assets/Stories/37.png" //Pitch game
import slide38 from "/src/assets/game-assets/Stories/38.png"
import slide39 from "/src/assets/game-assets/Stories/39.png"
import slide40 from "/src/assets/game-assets/Stories/40.png"
import slide41 from "/src/assets/game-assets/Stories/41.png"
import slide42 from "/src/assets/game-assets/Stories/42.png"
import slide43 from "/src/assets/game-assets/Stories/43.png" // Harmony game
import slide44 from "/src/assets/game-assets/Stories/44.png"
import slide45 from "/src/assets/game-assets/Stories/45.png"
import slide46 from "/src/assets/game-assets/Stories/46.png"
import slide47 from "/src/assets/game-assets/Stories/47.png"
import slide48 from "/src/assets/game-assets/Stories/48.png"
import slide49 from "/src/assets/game-assets/Stories/49.png"

const chapter1 = [
    { id: '1', src: slide1 }, { id: '2', src: slide2 }, { id: '3', src: slide3 }, 
    { id: '4', src: slide4 }, { id: '5', src: slide5 }, { id: '6', src: slide6 }, 
    { id: '7', src: slide7 }, { id: '8', src: slide8 }, { id: '9', src: slide9 }, 
    { id: '10', src: slide10 }, { id: '11', src: slide11 }, { id: '12', src: slide12 }, 
]

const chapter2 = [
    { id: '13', src: slide13 }, { id: '14', src: slide14 }, { id: '15', src: slide15 }, 
    { id: '16', src: slide16 }, { id: '17', src: slide17 }, { id: '18', src: slide18 }, 
    { id: '19', src: slide19 }, { id: '20', src: slide20 }, { id: '21', src: slide21 }, 
    { id: '22', src: slide22 },
]

const chapter3 = [
    { id: '23', src: slide23 }, { id: '24', src: slide24 }, 
    { id: '25', src: slide25 }, { id: '26', src: slide26 },  { id: '27', src: slide27 },  { id: '28', src: slide28 },  
    { id: '29', src: slide29 },  { id: '30', src: slide30 },  { id: '31', src: slide31 },  { id: '32', src: slide32 }, 
    { id: '33', src: slide33 },  { id: '34', src: slide34 },  { id: '35', src: slide35 },  { id: '36', src: slide36 }, 
]

const chapter4 = [
    { id: '37', src: slide37 },  { id: '38', src: slide38 },  { id: '39', src: slide39 },  { id: '40', src: slide40 }, 
      { id: '41', src: slide41 },  { id: '42', src: slide42 }, 
]

const chapter5 = [
    { id: '43', src: slide43 },  { id: '44', src: slide44 },  { id: '45', src: slide45 },  { id: '46', src: slide46 }, 
      { id: '47', src: slide47 },  { id: '48', src: slide48},  { id: '49', src: slide49 }, 
]


function Story() {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation(); 
    const [scrollDown, setScrollDown] = useState(false);
    const storyRef = useRef(null); 
    const [currentSlideId, setCurrentSlideId] = useState(
        localStorage.getItem('current-reading-page') || '1'
    );

    useEffect(() => {
        const urlHashId = location.hash ? location.hash.substring(1) : null;
        const targetId = urlHashId || localStorage.getItem('current-reading-page');

        if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start" 
                });
            }
        }
    }, [location.hash]); 

    useEffect(() => {
        if (!storyRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                let highestVisibleId = null;

                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const id = entry.target.id;
                        
                        if (!highestVisibleId || parseInt(id) < parseInt(highestVisibleId)) {
                            highestVisibleId = id;
                        }
                    }
                });

                if (highestVisibleId) {
                    localStorage.setItem('current-reading-page', highestVisibleId);
                    setCurrentSlideId(highestVisibleId);
                }
            },
            {
                rootMargin: '0px',
                threshold: [0.1, 0.5, 0.9], 
            }
        );

        const images = storyRef.current.querySelectorAll('.img-story');
        images.forEach(img => {
            observer.observe(img);
        });

        return () => {
            images.forEach(img => {
                observer.unobserve(img);
            });
        };
    }, [currentUser]);

    const handleScroll = () => {
        if (!scrollDown) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
            setScrollDown(true);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            setScrollDown(false);
        }
    };

    const isChapter2Unlocked = currentUser && currentUser.maps.rhythm.isLocked === false;
    const isChapter3Unlocked = currentUser && currentUser.maps.melody.isLocked === false;
    const isChapter4Unlocked = currentUser && currentUser.maps.harmony.isLocked === false;
    const isChapter5Unlocked = currentUser && currentUser.maps.pitch.isLocked === false;
    
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='story-container fpage flex fdc aic jc-c'>
            <div className='flex fdc aic jc-c' style={{ position: 'relative', width: '100%' }}>
                <h1>Story</h1>
                <p>The Lost MusicQuestro Land (Current Slide: {currentSlideId})</p>

                <div className='flex fdc aic jc-c' style={{ backgroundColor: 'white', borderRadius: '50%', position: 'fixed', right: '1em', top: '1em' }}>
                    <img onClick={handleBackClick} width={40} src={backBtn} alt="" style={{ cursor: 'pointer' }} />
                </div>

                <img onClick={handleScroll} style={{
                    position: 'fixed', right: '1em', top: '4em', opacity: '0.2',
                    transform: scrollDown ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s ease-in-out', cursor: 'pointer'
                }} src={arrowDown} alt="" />
            </div>

                <p style={{ position: 'fixed', right: '1em', top: '6em', opacity: '0.2'}}>{currentSlideId}</p>

            <div className="story-wrapper flex fdc aic jc-c" ref={storyRef}>
                    {
                        chapter1.map((img, index)=> {
                            return <img key={index} id={img.id} src={img.src} className="img-story"/>
                        })
                    }
                    {
                        isChapter2Unlocked &&
                        chapter2.map((img, index)=> {
                            return <img key={index} id={img.id} src={img.src} className="img-story"/>
                        })
                    }
                    {
                        isChapter3Unlocked &&
                        chapter3.map((img, index)=> {
                            return <img key={index} id={img.id} src={img.src} className="img-story"/>
                        })
                    }
                    {
                        isChapter4Unlocked &&
                        chapter4.map((img, index)=> {
                            return <img key={index} id={img.id} src={img.src} className="img-story"/>
                        })
                    }
                    {
                        isChapter5Unlocked &&
                        chapter5.map((img, index)=> {
                            return <img key={index} id={img.id} src={img.src} className="img-story"/>
                        })
                    }
                   
                    
                  
                </div>

            <button
                    onClick={() => navigate('/h/m')}
                    style={{ width: '18em', margin: '2em', padding: '0.5em 1em', fontSize: '1.2em', backgroundColor: 'green', borderRadius: '5px' }}
                >
                    Play Game
                </button>
        </div>
    );
}

export default Story;