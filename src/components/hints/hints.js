import './hintsStyle.css';
import microtip from 'microtip/microtip.css';
//only for use microtip

const refs = {
  addAd: document.querySelector('.adcontrol__additem'),
  exitbtn: document.querySelector('.exitbtn'),
  filterBtn: document.querySelector('.filter-item'),
};

refs.addAd.addEventListener('mousemove', e => {
  e.target.setAttribute('aria-label', 'додати оголошення');
  e.target.setAttribute('data-microtip-position', 'right');
  e.target.setAttribute('role', 'tooltip');
});

refs.exitbtn.addEventListener('mousemove', e => {
  e.target.setAttribute('aria-label', 'вихід');
  e.target.setAttribute('data-microtip-position', 'left');
  e.target.setAttribute('role', 'tooltip');
});

refs.filterBtn.addEventListener('mousemove', e => {
  e.target.setAttribute('aria-label', 'повернутися до початкового пошуку');
  e.target.setAttribute('data-microtip-position', 'bottom');
  e.target.setAttribute('role', 'tooltip');
});
