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
  'acraft-eg.com': ['An Arabic automotive website for ACRAFT, using vehicle imagery and a clear presentation to introduce the business and its automotive offering.', 'Automotive website']
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
  card.setAttribute('aria-label', `View ${title} project details`);
  const caption = document.createElement('span');
  caption.className = 'card__category';
  caption.textContent = categories[card.dataset.category];
  card.append(caption);
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
