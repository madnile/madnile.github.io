// Simple slideshow and controls
(function(){
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  let playing = true;
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');

  function show(index){
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function next(){
    current = (current + 1) % slides.length;
    show(current);
  }

  function prev(){
    current = (current - 1 + slides.length) % slides.length;
    show(current);
  }

  let timer = setInterval(next, 5000);

  nextBtn.addEventListener('click', function(){ next(); resetTimer(); });
  prevBtn.addEventListener('click', function(){ prev(); resetTimer(); });

  playPauseBtn.addEventListener('click', function(){
    if(playing){
      clearInterval(timer);
      playPauseBtn.textContent = 'Play';
    } else {
      timer = setInterval(next, 5000);
      playPauseBtn.textContent = 'Pause';
    }
    playing = !playing;
  });

  function resetTimer(){
    if(playing){
      clearInterval(timer);
      timer = setInterval(next, 5000);
    }
  }

  // contact form handling
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const out = document.getElementById('formMessage');
      if(!name || !email || !message){
        out.textContent = 'Please complete all fields';
        out.style.color = 'red';
        return;
      }
      out.textContent = 'Thanks. Your message was received. I will reply soon.';
      out.style.color = 'green';
      form.reset();
    });
  }

  // live clock
  function updateClock(){
    const el = document.getElementById('liveClock');
    if(!el) return;
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,'0');
    const mins = now.getMinutes().toString().padStart(2,'0');
    el.textContent = 'Local time ' + hours + ':' + mins;
  }
  updateClock();
  setInterval(updateClock, 60000);

  // initial show
  show(current);
})();
