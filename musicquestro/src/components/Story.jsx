import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import backBtn from '/src/assets/game-assets/Assets/Buttons/Back.png';
import arrowDown from '../assets/game-assets/AppAssets/arrowDown.png';
import { UserContext } from './CurrentUserContext';
import '../styles/Story.css';

// ====================================
// 🖼️ IMPORT ALL SLIDE ASSETS
// ====================================
import slide1 from "/src/assets/game-assets/Scenes(HQ)/1.png"
import slide2 from "/src/assets/game-assets/Scenes(HQ)/2.png"
import slide3 from "/src/assets/game-assets/Scenes(HQ)/3.png"
import slide4 from "/src/assets/game-assets/Scenes(HQ)/4.png"
import slide5 from "/src/assets/game-assets/Scenes(HQ)/5.png"
import slide6 from "/src/assets/game-assets/Scenes(HQ)/6.png"
import slide7 from "/src/assets/game-assets/Scenes(HQ)/7.png"
import slide8 from "/src/assets/game-assets/Scenes(HQ)/8.png"
import slide9 from "/src/assets/game-assets/Scenes(HQ)/9.png"
import slide10 from "/src/assets/game-assets/Scenes(HQ)/10.png"
import slide11 from "/src/assets/game-assets/Scenes(HQ)/11.png"
import slide12 from "/src/assets/game-assets/Scenes(HQ)/12(Before Rhythm Game).png"
import slide13 from "/src/assets/game-assets/Scenes(HQ)/13.png"
import slide14 from "/src/assets/game-assets/Scenes(HQ)/14(After Rhythm Game).png"
import slide15 from "/src/assets/game-assets/Scenes(HQ)/15.png"
import slide16 from "/src/assets/game-assets/Scenes(HQ)/16.png"
import slide17 from "/src/assets/game-assets/Scenes(HQ)/17.png"
import slide18 from "/src/assets/game-assets/Scenes(HQ)/18.png"
import slide19 from "/src/assets/game-assets/Scenes(HQ)/19.png"
import slide20 from "/src/assets/game-assets/Scenes(HQ)/20.png"
import slide21 from "/src/assets/game-assets/Scenes(HQ)/21.png"
import slide22 from "/src/assets/game-assets/Scenes(HQ)/22(Before Melody Game).png"
import slide23 from "/src/assets/game-assets/Scenes(HQ)/23.png"
import slide24 from "/src/assets/game-assets/Scenes(HQ)/24(After Melody Game).png"
import end from "/src/assets/game-assets/Scenes(HQ)/THE_END.png"



// ====================================
// 📝 SLIDE DATA ARRAY
// ====================================
const allSlides = [
    // Chapter 1
    { id: '1', src: slide1 }, { id: '2', src: slide2 }, { id: '3', src: slide3 }, 
    { id: '4', src: slide4 }, { id: '5', src: slide5 }, { id: '6', src: slide6 }, 
    { id: '7', src: slide7 }, { id: '8', src: slide8 }, { id: '9', src: slide9 }, 
    { id: '10', src: slide10 }, { id: '11', src: slide11 }, { id: '12', src: slide12 }, 
    
    // Chapter 2
    { id: '13', src: slide13 }, { id: '14', src: slide14 }, { id: '15', src: slide15 }, 
    { id: '16', src: slide16 }, { id: '17', src: slide17 }, { id: '18', src: slide18 }, 
    { id: '19', src: slide19 }, { id: '20', src: slide20 }, { id: '21', src: slide21 }, 
    
    // Chapter 3
    { id: '22', src: slide22 }, { id: '23', src: slide23 }, { id: '24', src: slide24 }, 

    { id: '25', src: end }, , 


];

const CHAPTER_2_START_ID = '13';
const CHAPTER_3_START_ID = '22';

// ====================================
// 🚀 STORY COMPONENT
// ====================================
function Story() {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation(); // Hook to access URL hash
    const [scrollDown, setScrollDown] = useState(false);
    const storyRef = useRef(null); // Ref for the main container (where scrolling happens)
    const [currentSlideId, setCurrentSlideId] = useState(
        localStorage.getItem('current-reading-page') || '1'
    );

    // --- EFFECT TO SCROLL TO SAVED PAGE OR HASH ON LOAD ---
    useEffect(() => {
        // 1. Determine the target ID (URL hash takes precedence)
        const urlHashId = location.hash ? location.hash.substring(1) : null;
        const targetId = urlHashId || localStorage.getItem('current-reading-page');

        if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                // Use scrollIntoView for reliable cross-browser scrolling
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start" 
                });
            }
        }
    }, [location.hash]); // Reruns when the URL hash changes

    // --- EFFECT FOR INTERSECTION OBSERVER (SAVING CURRENT PAGE) ---
    useEffect(() => {
        if (!storyRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                let highestVisibleId = null;

                // 1. Find the highest image that is substantially visible
                entries.forEach(entry => {
                    // Check if the image is visible AND at least 50% visible
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const id = entry.target.id;
                        
                        // Keep track of the lowest numerical ID (highest image on screen)
                        if (!highestVisibleId || parseInt(id) < parseInt(highestVisibleId)) {
                            highestVisibleId = id;
                        }
                    }
                });

                // 2. Update state and localStorage only once
                if (highestVisibleId) {
                    localStorage.setItem('current-reading-page', highestVisibleId);
                    setCurrentSlideId(highestVisibleId);
                }
            },
            {
                // root: storyRef.current, // Use null if the entire document body scrolls
                rootMargin: '0px',
                threshold: [0.1, 0.5, 0.9], 
            }
        );

        // Target all image elements within the container
        const images = storyRef.current.querySelectorAll('.img-story');
        images.forEach(img => {
            observer.observe(img);
        });

        // Cleanup function
        return () => {
            images.forEach(img => {
                observer.unobserve(img);
            });
        };
    }, [currentUser]);

    // --- SCROLL BUTTON HANDLER ---
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

    // --- CONDITIONAL RENDERING LOGIC ---
    const isChapter2Unlocked = currentUser && currentUser.maps.melody.isLocked === false;
    const isChapter3Unlocked = currentUser && currentUser.maps.harmony.isLocked === false;

    // Filter slides based on unlock status
    const slidesToRender = allSlides.filter(slide => {
        const idNum = parseInt(slide.id);
        if (idNum < parseInt(CHAPTER_2_START_ID)) return true; // Chapter 1 slides
        if (idNum < parseInt(CHAPTER_3_START_ID)) return isChapter2Unlocked; // Chapter 2 slides
        return isChapter3Unlocked; // Chapter 3 slides
    });
    
    // Function to navigate back
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='story-container fpage flex fdc aic jc-c'>
            <div className='flex fdc aic jc-c' style={{ position: 'relative', width: '100%' }}>
                <h1>Story</h1>
                <p>The Lost MusicQuestro Land (Current Slide: {currentSlideId})</p>

                {/* Back Button */}
                <div className='flex fdc aic jc-c' style={{ backgroundColor: 'white', borderRadius: '50%', position: 'fixed', right: '1em', top: '1em' }}>
                    <img onClick={handleBackClick} width={40} src={backBtn} alt="" style={{ cursor: 'pointer' }} />
                </div>

                {/* Scroll Button */}
                <img onClick={handleScroll} style={{
                    position: 'fixed', right: '1em', top: '4em', opacity: '0.2',
                    transform: scrollDown ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s ease-in-out', cursor: 'pointer'
                }} src={arrowDown} alt="" />
            </div>

                <p style={{ position: 'fixed', right: '1em', top: '6em', opacity: '0.2'}}>{currentSlideId}</p>

            {/* Main Story Wrapper - Ref is attached here */}
            <div className="story-wrapper flex fdc aic jc-c" ref={storyRef}>
                {slidesToRender.map(slide => (
                    <img key={slide.id} id={slide.id} src={slide.src} alt="" className="img-story" />
                ))}

                {/* Chapter Lock Statuses */}
                {!isChapter2Unlocked && <p>Chaper 2 Locked. Complete Rhythm Game first</p>}
                {!isChapter3Unlocked && isChapter2Unlocked && <p>Chaper 3 Locked. Complete Melody Game first</p>}

                {/* Play Button */}
                <button
                    onClick={() => navigate('/h/m')}
                    style={{ width: '90%', margin: '2em', padding: '0.5em 1em', fontSize: '1.2em', backgroundColor: 'green', borderRadius: '5px' }}
                >
                    Play Game
                </button>
            </div>
        </div>
    );
}

export default Story;