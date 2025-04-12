// trigger to play music in the background with sweetalert
window.addEventListener('load', () => {
    Swal.fire({
        html: `
        <h2 style="margin-bottom: 1rem;">Do you want to play our beautiful song in the background?</h2>
        <img src="pictures/Hugging_Pic.jpg" alt="Hugging pic" style="max-width: 100%; margin: 0 auto; display: block;" />
      `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
});
  
// animation timeline
const animationTimeline = () => {
      const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
      const hbd = document.getElementsByClassName("wish-hbd")[0];
      textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
      hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;
    
      const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
      const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };
    
      const tl = new TimelineMax();
      
      tl.to(".container", 0.6, { visibility: "visible" })
        .from(".one", 0.7, { opacity: 0, y: 10 })
        .from(".two", 0.4, { opacity: 0, y: 10 })
        .to(".one", 0.7, { opacity: 0, y: 10 }, "+=1")
        .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
        .from(".three", 0.7, { opacity: 0, y: 10 })
        .to(".three", 0.7, { opacity: 0, y: 10 }, "+=1")
        .from(".Updated-Four", 0.7, { opacity:0, y:10 })
        .add(() => {
          tl.pause();
          createEnvelope();
          //enableHoverTrigger();
          envelope = document.getElementsByClassName("container-for-Envelope")[0];
          gsap.registerPlugin(MotionPathPlugin);
          requestAnimationFrame(() => {
              envelope.style.opacity = "1";
          });
          
          wrapper = document.querySelector(".wrapper");
          wrapper.addEventListener("click", () => {          
                gsap.to(".Updated-Four", { opacity: 0, duration: 1, ease: "power2.out" });
                wrapper.classList.add("clicked");
  
                gsap.set(".lid.one", { transform: "rotateX(90deg)" });
                gsap.set(".lid.two", { transform: "rotateX(180deg)" });
                const letter = document.querySelector(".letter");
                
                const letterRect = letter.getBoundingClientRect();
                const startX = letterRect.left;
                const startY = letterRect.top;
                const letterWidth = letterRect.width;
                const letterHeight = letterRect.height;
                
                letter.classList.remove("free-flight");
                letter.style = "";
                letter.classList.add("free-flight");
  
                gsap.set(letter, {
                    position: "fixed",
                    top: startY + "px",
                    left: startX + "px",
                    width: letterWidth + "px",
                    height: letterHeight + "px",
                    zIndex: 99999,
                    backgroundColor: "#F9A8D4",
                    margin: 0,
                    padding: 0
                });
                
                const tl2 = gsap.timeline({
                    onComplete: function() {
                        gsap.set(letter, { overflowY: "auto" });
                    }
                });
                
                tl2.to(letter, {
                    duration: 1.5,
                    motionPath: {
                        path: [
                            { x: 0, y: 0 },
                            { x: -100, y: -150 },
                            { x: 0, y: -300 },
                            { x: 100, y: -150 },
                            { x: 0, y: -startY + 100 }
                        ],
                        curviness: 2,
                        autoRotate: false,
                        alignOrigin: [0.5, 0.5]
                    },
                    ease: "power2.inOut",
                    scale: 1.5
                })
                .to(letter, {
                    duration: 0.8,
                    top: "0px",
                    left: "50%",
                    xPercent: -50,
                    width: "500px",
                    height: "650px",
                    scale: 1,
                    ease: "back.out(1.2)",
                    onComplete: function() {
                        gsap.set(letter, { 
                            clearProps: "xPercent,transform",
                            overflowY: "auto"
                        });
                    }
                }, "+=0.1")
                .call(() => {
                    const para = document.querySelector(".letter .letter-content .hidden-content");
                    para.classList.add("visible");
                    const message = para.getAttribute("data-text");
                    para.innerHTML = "";
                    typeWriter(para, message, 50);
                    letter.style.pointerEvents = "auto";
                    document.querySelector(".wrapper").classList.add("disable-hover");

                    setTimeout(() => {
                        const continueBtn = document.createElement("button");
                        continueBtn.className = "continue-btn";
                        continueBtn.textContent = "Continue";
                        document.querySelector(".container-for-Envelope").appendChild(continueBtn);
                        
                        continueBtn.addEventListener("click", () => {
                          gsap.to(".wrapper", { opacity: 0, duration: 1, ease: "power2.out" });
                          gsap.to(".letter", { opacity: 0, duration: 1, ease: "power2.out" });
                          gsap.to(".container-for-Envelope", { opacity: 0, duration: 1, ease: "power2.out" });
                          gsap.to(".continue-btn", { opacity: 0, duration: 1, ease: "power2.out" });
                          tl.resume();
                        });
                      }, 5000);
                });
          });
        })
        .from(".four", 0.7, { scale: 0.2, opacity: 0 })
        .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
        .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
        .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" }, "+=4")
        .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
        .from(".idea-1", 0.7, ideaTextTrans)
        .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5") //It should be +=2.5 
        .from(".idea-2", 0.7, ideaTextTrans)
        .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5") //It should be +=2.5 
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
        .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5") //It should be +=2.5 
        .from(".idea-4", 0.7, ideaTextTrans)
        .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5") //It should be +=2.5  
        .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=1.5")
        .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4") //It should be +=1.4
        .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2") //It should be +=2
        .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
        .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, "+=1.5")
        .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
        .add(() => {
            // Insert the carousel if it doesn't exist
            if (!document.querySelector('.carousel-container')) {
                const carouselHTML = `
                  <div class="carousel-container">
                    <div class="carousel-track">
                      <div class="carousel-slide" style="background-image: url('Pictures/Kissing_My_Love.png');"></div>
                      <div class="carousel-slide" style="background-image: url('Pictures/Pizza_Yummy.png');"></div>
                      <div class="carousel-slide" style="background-image: url('Pictures/Nice_Picture_Of_Us.png');"></div>
                      <div class="carousel-slide" style="background-image: url('Pictures/Hugging_Pic.jpg');"></div>
                      <div class="carousel-slide" style="background-image: url('Pictures/LILA.png');"></div>
                      <div class="carousel-slide" style="background-image: url('Pictures/Super_Market.jpg');"></div>
                      <div class="carousel-slide" style="background-image: url('Pictures/Us.png');"></div>
                    </div>
                  </div>
                `;
                document.querySelector('.container').insertAdjacentHTML('beforeend', carouselHTML);
              }
            
            // Duplicate the carousel track content for seamless looping
            const track = document.querySelector(".carousel-track");
            track.innerHTML += track.innerHTML;

            // Animate the carousel track with GSAP:
            gsap.to(".carousel-track", {
            x: "-=3500",  // Shift 4000px left (one full set)
            ease: "none", // Linear for continuous motion
            duration: 10, // Adjust as needed for speed
            repeat: -1    // Infinite repeat
            });
        })
        .from(".profile-picture", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
        .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
        .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
        .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
        .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
        .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
        .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => { tl.restart(); });
};

function createEnvelope() {
  const containerForEnvelope = document.createElement("div");
  containerForEnvelope.classList.add("container-for-Envelope");  
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  const lidOne = document.createElement("div");
  lidOne.classList.add("lid", "one");
  const lidTwo = document.createElement("div");
  lidTwo.classList.add("lid", "two");
  const envelope = document.createElement("div");
  envelope.classList.add("envelope");

  const letter = document.createElement("div");
  letter.classList.add("letter");
  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("letter-content");
  const paragraph = document.createElement("p");
  paragraph.classList.add("hidden-content");
  const message = `<div style="text-align: center; font-size:2rem; margin: 0;">❤לנסיכה שלי</div><div style="text-align: right; direction: rtl; font-size: 1.5rem; width: 100%; margin: 0; white-space: normal; overflow-wrap: break-word;">טוב אז אמממ.... לילדה המושלמת הזאת יש יום הולדת, לילדה שאני הכי אוהב בעולם, לילדה המדהימה הזאת ששינתה אותי לגמרי והפכה אותי לבן אדם הרבה יותר טוב.
יש לי באמת כל כך הרבה דברים שאני רוצה לכתוב לך ואין לי שום מושג איך להתחיל לכתוב את זה אבל אני פשוט אתחיל בלאחל לך כמה דברים.
בראש ובראשונה אני מאחל לך בריאות, הצלחה בלימודים העתידיים ובכל מעשה ידייך, בריאות, אושר ועושר (כי כרגע זה הדבר האחרון שיש לנו אנחנו והמשכורת עוני הזאת), יושר, שפע מהכל, אני מאחל לך שתמיד תוכלי להקיף אותך בחברים, משפחה, ואנשים שאוהבים אותך ותומכים בך, ואני מאחל לך שתמיד תוכלי ללמוד מטעויות, להשכיל, ולגדול מהם. <br> <br>

שנה שעברה בברכה שלך כתבתי משהו דומה, רק ששם איחלתי לנו "שבעתיד נוכל להיפגש ושזה יתפתח לא רק פה", וכשחושבים על זה? זה פשוט מצחיק. אמרתי את זה בידיעה שכמעט ואין סיכוי שהולך לקרות משהו, והינה תראי אותי ואותך עכשיו - את שווית אותי בקסמים שלך. את שווית אותי בחיוך המאושר והמדהים שלך - שאני נשבע לך, בכל רגע שאני רואה אותו אני אוטומטית נהיה שמח ומחייך, את שווית אותי ביופי שלך, בחוכמה שלך, בהגינות, ביושר ובכנות שלך. את שווית אותי בכל פרמטר אפשרי, מה שלא חשבתי בכלל שיכול לקרות. <br><br>

אני חושב שבהזדמנות הזאת זה באמת מתאים שאני אסביר לך מה את בשבילי ומה את גורמת לי להרגיש, אם תשימי לב בכל פעם שאני רואה אותך אני ישירות מחייך - היופי שלך, המבט שלך, זה נותן לי הכל, זה נותן לי ביטחון ותחושת שמחה שלעולם לא הייתה לי. אומנם מבחוץ אני נראה אחד שיש לו יחסית הרבה ביטחון אבל יש לא מעט פעמים במיוחד כשאני לא מתאמן או מסדר את השיער שאני מרגיש חסר ביטחון, אבל כשאת איתי? החוסר ביטחון הזה נעלם. אני יכול להיות לידך בלי השיער מסודר, בלי שהתאמנתי לאורך תקופה מאוד ארוכה, ובלי לעשות השתדלות כלשהי שקשורה איכשהו למראה שלי, את גורמת לי להרגיש ביטחון שלא הרגשתי מימי חיי. את האישה היחידה שגורמת לי לאהוב ככה ולהרגיש ככה לידה. 
אני אוהב בך הכל, אני אוהב בנו הכל, אני אוהב את איך שאנחנו מדברים על דברים, על איך שאנחנו מנהלים שיחה ומתווכחים על דברים בצורה רגועה ושקטה, אני אוהב את איך שאת מטריפה אותי בכל פעם שאני רואה אותך, אני פשוט לא מסוגל להחזיק את עצמי - כמו שאמרתי, את מטריפה אותי. אני מחבק אותך, מנשק אותך בלי הפסקה ולבסוף מוריד ממך את הבגדים(כי איך זה הגיוני שאוכל להחזיק את עצמי עם מישהי כמוך). את מטריפה אותי כל כך שאני אשכרה כותב את הברכה הזאת ב 6 בבוקר כי הייתי ער כל הלילה לעבוד על האתר שאת צופה בו עכשיו. כל כך מטריפה אותי שכבר כמה שבועות אני עובד עליו ולומד רק בשביל להראות לך אותו ביום ההולדת שלך, היום. <br><br>

ליבי אני רוצה שתדעי שבכל פעם שאני איתך אני פשוט מרגיש בעננים, מרגיש כאילו את לא עוד אחת בחיים שלי, מרגיש כאילו הקשר שלנו הוא פשוט לנצח, וככה אני מקווה שהוא יהיה, איתך זה לנצח❤
בכל פעם שאני איתך אני פשוט לא מבין מה קורה, בכל פעם שאני איתך הזמן נעצר, בכל שניה שאני מחבק אותך החיוך שלי עולה, אני מסתכל על העיניים הנוצצות שלך ורואה עולם שלם, מסתכל על החיוך הביישני והחמוד שלך ורואה את העולם מחייך איתו ביחד, וזה כל מה שאני רוצה לראות בחיים שלי. מי חשב שאכיר את האישה הכי מדהימה שאי פעם הכרתי באפליקציית צאטים הזויה? מי חשב שאותה אחת תהפוך למשהו כל כך משמעותי מהחיים שלי? כנראה שאף אחד...אבל אני מאושר שזאת את, אני מאושר בזה שזכיתי בבת זוג כמוך.<br><br>

בברכה שלך היו חלקים שכתבת בהם תודה על סיטואציות מסויימות, אז לא ליבי, תודה לך על זה שנכנסת לי לחיים, תודה לך ששינית אותי לגמרי, תודה לך שנתת לי את הביטחון להאמין שאני יכול להיכנס לזוגיות שוב. תודה על הזכות להכיר אותך, הזכות שאת הבת זוג שלי. תודה על הבחורה שאת, על האישה המדהימה שאת, תודה שאת נכנסת לי לחיים ולא חסמת אותי על השניה הראשונה, תודה על שהאמנת שכן יכול לקרות משהו בזמן שאני לגמרי לא, תודה על החיבוקים, על הנשיקות, על הביטחון שאת נותנת לי. תודה על שנכנסת לי לחיים בדרך הכי לא צפויה שיש. <br><br>

אני אוהב אותך יותר מכל דבר בחיים האלה, אני אוהב אותך כל כך ליבי שלי, נסיכה שלי. מההתחלה קראתי לך ככה, והתכוונתי לכל מילה, את הנסיכה הקטנה שלי, ולא משנה מה יקרה את תמיד תישארי אותה הנסיכה הקטנה שלי, התואר הזה תמיד יהיה שייך לך❤️</div>`;

  paragraph.setAttribute("data-text", message);
  paragraph.textContent = "";
  
  contentWrapper.appendChild(paragraph);
  letter.appendChild(contentWrapper);
  wrapper.appendChild(lidOne);
  wrapper.appendChild(lidTwo);
  wrapper.appendChild(envelope);
  wrapper.appendChild(letter);
  containerForEnvelope.appendChild(wrapper);
  const appendTo = document.getElementsByClassName("container")[0];
  appendTo.appendChild(containerForEnvelope);
}

function typeWriter(element, text, speed = 50) {
    let i = 0;
    let output = "";
    const len = text.length;
    
    function type() {
      if (i < len) {
        if (text[i] === '<') {
          const closeIndex = text.indexOf('>', i);
          if (closeIndex !== -1) {
            output += text.substring(i, closeIndex + 1);
            i = closeIndex + 1;
            element.innerHTML = output;
            // Try to update scrollTop
            element.scrollTop = element.scrollHeight;
            // Also scroll the last element (if exists) into view
            if (element.lastElementChild) {
              element.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
            setTimeout(type, speed);
            return;
          }
        }
        output += text.charAt(i);
        element.innerHTML = output;
        // Update scroll position
        element.scrollTop = element.scrollHeight;
        // Scroll last element into view if available
        if (element.lastElementChild) {
          element.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

function enableHoverTrigger() {
  const wrapper = document.querySelector('.wrapper');
  const lidOne = document.querySelector('.lid.one');
  const lidTwo = document.querySelector('.lid.two');
  const letter = document.querySelector('.letter');
  
  wrapper.addEventListener("mouseenter", () => {
    lidOne.style.transform = "rotateX(90deg)";
    lidTwo.style.transform = "rotateX(180deg)";
    letter.style.transform = "translateY(-50px)";
  });
  
  wrapper.addEventListener("mouseleave", () => {
    lidOne.style.transform = "rotateX(0deg)";
    lidTwo.style.transform = "rotateX(90deg)";
    letter.style.transform = "translateY(0)";
  });
}
