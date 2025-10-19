const form = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const commentInput = document.getElementById('comments');
const charCount = document.getElementById('char-count');
const feedbackDisplay = document.getElementById('feedback-display');

commentInput.addEventListener('input', () => {
  charCount.textContent = String(commentInput.value.length);
});

function showTooltip(target, event) {
  const msg = target.getAttribute('data-tooltip');
  if (!msg) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.innerText = msg;

  document.body.appendChild(tooltip);

  tooltip.style.position = 'absolute';
  tooltip.style.left = `${event.clientX + 10}px`;
  tooltip.style.top = `${event.clientY + 10}px`;
  target._tooltip = tooltip;
}

function hideTooltip(target) {
  if (target._tooltip) {
    document.body.removeChild(target._tooltip);
    delete target._tooltip;
  }
}

document.body.addEventListener('mouseover', (e) => {
  if (e.target.hasAttribute('data-tooltip')) {
    showTooltip(e.target, e);
  }
});

document.body.addEventListener('mouseout', (e) => {
  if (e.target.hasAttribute('data-tooltip')) {
    hideTooltip(e.target);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;
  const messages = [];

  if (!nameInput.value.trim()) {
    valid = false;
    messages.push('Please enter your full name.');
  }

  if (!emailInput.value.trim()) {
    valid = false;
    messages.push('Please enter your email.');
  } else if (!validateEmail(emailInput.value.trim())) {
    valid = false;
    messages.push('Please enter a valid email address.');
  }

  if (!commentInput.value.trim()) {
    valid = false;
    messages.push('Please enter your comments.');
  }

  const typeSelect = document.getElementById('type');
  if (!typeSelect.value) {
    valid = false;
    messages.push('Please select a feedback type.');
  }

  if (!valid) {
    alert(messages.join('\n'));
    return;
  }

  const feedbackEntry = document.createElement('div');
  feedbackEntry.className = 'feedback-entry';

  feedbackEntry.innerHTML = `
    <strong>Name:</strong> ${nameInput.value}<br/>
    <strong>Email:</strong> ${emailInput.value}<br/>
    <strong>Type:</strong> ${typeSelect.options[typeSelect.selectedIndex].text}<br/>
    <strong>Comments:</strong> ${commentInput.value}
  `;
  feedbackDisplay.appendChild(feedbackEntry);

  form.reset();

  charCount.textContent = '';
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}