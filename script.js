const tabs = document.querySelectorAll('.tab');
const cards = [...document.querySelectorAll('.card')];
const empty = document.querySelector('.work__empty');
const modal = document.querySelector('.project-modal');
const categories = {
  'real-estate': 'Real estate', law: 'Law', tourism: 'Tourism',
  ecommerce: 'E-commerce', services: 'Services'
};
// Keep descriptions here alongside the existing project links and images in index.html.
const projects = {
  'miraigates.com': ['A business website introducing Mirai Gates and its services, with a visual presentation of the company and a direct route to get in touch.', 'Business website'],
  'hocuspocuseg.com': ['An online storefront for Hocus Pocus, bringing the brand and its product collection together in a shopping-focused experience.', 'Online store'],
  'alwaheeddevelopment.com': ['A property development website showcasing Alwaheed Development, its real estate projects and opportunities to connect with the company.', 'Property showcase'],
  'bod.com.sa': ['A website for ولادة حلم, presenting the organization and its work through an Arabic digital presence.', 'Organization website'],
  'maskan.org.sa': ['An Arabic website for جمعية مسكن, introducing the association and its housing-focused work in a clear, accessible presentation.', 'Association website'],
  'redaelsayedlawfirm.com': ['A professional website for Reda Elsayed Lawfirm, introducing the practice and its legal services and helping visitors find a way to contact the firm.', 'Law firm website'],
  'tmxreisen.de': ['A travel website for TMX Reisen, presenting the travel business and its offerings to visitors planning their next trip.', 'Travel website'],
  'kafdevelopment.com': ['A real estate website for Kaf Development, presenting the developer and its projects through a property-focused visual experience.', 'Property showcase'],
  'mawa.org.sa': ['An Arabic website for جمعية مأوى, giving the association a digital home to present its mission and housing initiatives.', 'Association website'],
  'conquereg.com': ['An e-commerce website for Conqueror, showcasing the brand and its collection in a product-led shopping experience.', 'Online store'],
  'kayanac.net': ['A website introducing Kayanac ERP and its business management offering, helping visitors explore the product and contact the team.', 'ERP product website'],
  'solistarealestate.com': ['A real estate website for Solista, presenting the business and its property offering with a visual focus on real estate.', 'Real estate website'],
  'asasegy.com': ['A website for ASAS Real Estate, showcasing the company and its property development offering.', 'Property showcase'],
  'acraft-eg.com': ['An Arabic automotive website for ACRAFT, using vehicle imagery and a clear presentation to introduce the business and its automotive offering.', 'Automotive website'],
  'mu-abdo.github.io': ['An Arabic website for بودكاست حقق, presenting the podcast through a dedicated web page.', 'Podcast website'],
  'mildaarabia.com': ['An online store for Milda Arabia, presenting a collection of baby products.', 'Online store']
};
const matches = filter => card => filter === 'all' || card.dataset.category === filter;

tabs.forEach(tab => {
  const count = cards.filter(matches(tab.dataset.filter)).length;
  tab.querySelector('.tab__count').textContent = count;
  tab.classList.toggle('is-empty', count === 0);
  tab.setAttribute('aria-pressed', tab.classList.contains('is-active'));
  tab.addEventListener('click', () => {
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', active);
    });
    cards.forEach(card => card.classList.toggle('is-hidden', !matches(tab.dataset.filter)(card)));
    empty.hidden = cards.some(matches(tab.dataset.filter));
  });
});

let opener;
cards.forEach(card => {
  const title = card.querySelector('.card__label').textContent.trim();
  const image = card.querySelector('img');
  image.alt = `${title} website preview`;
  image.loading = 'lazy';
  image.decoding = 'async';
  card.setAttribute('aria-haspopup', 'dialog');
  const hostname = new URL(card.href).hostname.toLowerCase();
  const offline = hostname === 'github.com' || hostname.endsWith('.github.com') || hostname === 'github.io' || hostname.endsWith('.github.io');
  const status = offline ? 'Offline' : 'Online';
  card.setAttribute('aria-label', `View ${title} project details, ${categories[card.dataset.category]}, ${status}`);
  const metadata = document.createElement('span');
  metadata.className = 'card__metadata';
  const caption = document.createElement('span');
  caption.className = 'card__category';
  caption.textContent = categories[card.dataset.category];
  const statusLabel = document.createElement('span');
  statusLabel.className = `card__status card__status--${status.toLowerCase()}`;
  statusLabel.textContent = status;
  metadata.append(caption, statusLabel);
  card.append(metadata);
  card.addEventListener('click', event => {
    // Preserve opening the original website with a modified link click.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = card;
    const url = new URL(card.href);
    const domain = url.hostname.replace(/^www\./, '');
    const [description, type] = projects[domain] || [`Explore ${title} and visit the live website.`, 'Website'];
    document.querySelector('#project-title').textContent = title;
    document.querySelector('#project-description').textContent = description;
    document.querySelector('#project-category').textContent = categories[card.dataset.category];
    document.querySelector('#project-type').textContent = type;
    document.querySelector('#project-domain').textContent = domain;
    const preview = document.querySelector('#project-image');
    preview.src = image.getAttribute('src');
    preview.alt = image.alt;
    document.querySelector('#project-link').href = card.href;
    modal.showModal();
    document.body.classList.add('modal-open');
  });
});
modal.querySelector('.project-modal__close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const bounds = modal.getBoundingClientRect();
  if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close();
});
modal.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  opener?.focus({ preventScroll: true });
});

const helper = document.querySelector('.contact-helper');
const helperPanel = helper.querySelector('.contact-helper__panel');
const helperToggle = helper.querySelector('.contact-helper__toggle');
const helperClose = helper.querySelector('.contact-helper__close');
const helperText = helper.querySelector('.contact-helper__typed');
const helperAccessible = helper.querySelector('.contact-helper__accessible');
const helperLink = helper.querySelector('.contact-helper__link');
const robotImage = helperToggle.querySelector('img');
const greetings = [
  { lang: 'ar', dir: 'rtl', text: 'أهلاً! عندك استفسار أو فكرة مشروع؟ يسعدني أسمع منك.', link: 'تواصل معي على واتساب', close: 'إغلاق رسالة الترحيب', open: 'فتح رسالة التواصل', toggleClose: 'إغلاق رسالة التواصل', whatsapp: 'مرحبًا محمد، شفت البورتفوليو وحابب أستفسر عن مشروع' },
  { lang: 'en', dir: 'ltr', text: "Hi! Have a question or a project in mind? I'd love to hear from you.", link: 'Contact me on WhatsApp', close: 'Close welcome message', open: 'Open contact message', toggleClose: 'Close contact message', whatsapp: "Hi Muhammed, I saw your portfolio and I'd like to ask about a project." }
];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileHelper = window.matchMedia('(max-width: 520px)');
let typingTimer;
let cycleTimer;
let languageIndex = 0;
let helperInteracted = false;
let helperDrag = null;
let suppressHelperClick = false;
let robotTimer;

function setRobotState(state, resetAfter = 0) {
  clearTimeout(robotTimer);
  robotImage.src = `img/robot-${state}.gif`;
  if (resetAfter) robotTimer = setTimeout(() => setRobotState('idle'), resetAfter);
}

helperToggle.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  const bounds = helper.getBoundingClientRect();
  helperDrag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: bounds.left, bottom: window.innerHeight - bounds.bottom, moved: false };
  helperToggle.setPointerCapture(event.pointerId);
});
helperToggle.addEventListener('pointermove', event => {
  if (!helperDrag || event.pointerId !== helperDrag.pointerId) return;
  const dx = event.clientX - helperDrag.x;
  const dy = event.clientY - helperDrag.y;
  if (!helperDrag.moved && Math.hypot(dx, dy) < 5) return;
  if (!helperDrag.moved) setRobotState('dizzy');
  helperDrag.moved = true;
  helperInteracted = true;
  helper.classList.add('contact-helper--dragging');
  const bounds = helper.getBoundingClientRect();
  helper.style.left = `${Math.max(0, Math.min(window.innerWidth - bounds.width, helperDrag.left + dx))}px`;
  helper.style.bottom = `${Math.max(0, Math.min(window.innerHeight - bounds.height, helperDrag.bottom - dy))}px`;
});
function finishHelperDrag(event) {
  if (!helperDrag || event.pointerId !== helperDrag.pointerId) return;
  suppressHelperClick = helperDrag.moved;
  if (helperDrag.moved) setRobotState('dizzy', 3000);
  helperDrag = null;
  helper.classList.remove('contact-helper--dragging');
}
helperToggle.addEventListener('pointerup', finishHelperDrag);
helperToggle.addEventListener('pointercancel', finishHelperDrag);

function openHelper() {
  const greeting = greetings[languageIndex];
  helper.lang = greeting.lang;
  helper.dir = greeting.dir;
  helper.setAttribute('aria-label', greeting.lang === 'ar' ? 'التواصل' : 'Contact');
  helperPanel.hidden = false;
  helperToggle.setAttribute('aria-expanded', 'true');
  helperToggle.setAttribute('aria-label', greeting.toggleClose);
  helperClose.setAttribute('aria-label', greeting.close);
  helperAccessible.textContent = greeting.text;
  helperLink.textContent = greeting.link;
  helperLink.href = `https://wa.me/201552259617?text=${encodeURIComponent(greeting.whatsapp)}`;
  clearInterval(typingTimer);
  if (reducedMotion.matches) {
    helperText.textContent = greeting.text;
    return;
  }
  helperText.textContent = '';
  let index = 0;
  typingTimer = setInterval(() => {
    helperText.textContent = greeting.text.slice(0, ++index);
    if (index >= greeting.text.length) clearInterval(typingTimer);
  }, 35);
}
function closeHelper() {
  clearInterval(typingTimer);
  clearTimeout(cycleTimer);
  helperPanel.hidden = true;
  helperToggle.setAttribute('aria-expanded', 'false');
  helperToggle.setAttribute('aria-label', greetings[languageIndex].open);
}
function runHelperCycle() {
  clearTimeout(cycleTimer);
  if (helperPanel.hidden || reducedMotion.matches) return;
  cycleTimer = setTimeout(() => {
    if (!modal.open && !helperPanel.contains(document.activeElement) && !(window.matchMedia('(hover: hover)').matches && helperPanel.matches(':hover'))) {
      languageIndex = 1 - languageIndex;
      openHelper();
    }
    runHelperCycle();
  }, 5500);
}
helperToggle.addEventListener('click', event => {
  if (suppressHelperClick && event.detail !== 0) { suppressHelperClick = false; return; }
  suppressHelperClick = false;
  helperInteracted = true;
  if (helperPanel.hidden) { setRobotState('idea', 3000); openHelper(); runHelperCycle(); }
  else closeHelper();
});
helperClose.addEventListener('click', () => { helperInteracted = true; closeHelper(); helperToggle.focus(); });
mobileHelper.addEventListener('change', event => {
  if (event.matches) closeHelper();
});
setTimeout(() => {
  if (!mobileHelper.matches && !helperInteracted && helperPanel.hidden) { openHelper(); runHelperCycle(); }
}, 3500);
