const tabs  = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.card');
const empty = document.querySelector('.work__empty');

const matches = filter => card =>
  filter === 'all' || card.dataset.category === filter;

/* العدد بيتحسب من الكروت نفسها، فأي كارت جديد بيتعدّ لوحده */
tabs.forEach(tab => {
  const count = [...cards].filter(matches(tab.dataset.filter)).length;
  const badge = tab.querySelector('.tab__count');
  if (badge) badge.textContent = count;
  tab.classList.toggle('is-empty', count === 0);
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    const show = matches(tab.dataset.filter);
    let visible = 0;

    cards.forEach(card => {
      const isVisible = show(card);
      card.classList.toggle('is-hidden', !isVisible);
      if (isVisible) visible++;
    });

    if (empty) empty.hidden = visible > 0;
  });
});
