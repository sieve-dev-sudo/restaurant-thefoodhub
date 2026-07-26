// ============================================
// THE FOOD HUB — Form Validation
// Reservation Form + Contact Form
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  function showError(group, message) {
    group.classList.add('invalid');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(group) {
    group.classList.remove('invalid');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    return /^[0-9+\-\s()]{8,15}$/.test(value);
  }

  function validateForm(form) {
    let isValid = true;
    const groups = form.querySelectorAll('.form-group');

    groups.forEach(function (group) {
      const input = group.querySelector('input, select, textarea');
      if (!input) return;
      clearError(group);

      const value = input.value.trim();

      if (input.hasAttribute('required') && value === '') {
        showError(group, 'This field is required.');
        isValid = false;
        return;
      }

      if (input.type === 'email' && value !== '' && !isValidEmail(value)) {
        showError(group, 'Please enter a valid email address.');
        isValid = false;
        return;
      }

      if (input.type === 'tel' && value !== '' && !isValidPhone(value)) {
        showError(group, 'Please enter a valid phone number.');
        isValid = false;
        return;
      }

      if (input.type === 'date' && value !== '') {
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          showError(group, 'Please choose a future date.');
          isValid = false;
        }
      }
    });

    return isValid;
  }

  function generateBookingCode() {
    return 'RSV-' + Math.floor(100000 + Math.random() * 900000);
  }

  function guestLabel(value) {
    if (!value) return '';
    return value === '1' ? '1 Guest' : (value.indexOf('+') > -1 ? value + ' Guests' : value + ' Guests');
  }

  function showReservationInvoice(form) {
    if (!window.FoodHubDrawer) return false;

    const name = form.querySelector('#res-name').value.trim();
    const phone = form.querySelector('#res-phone').value.trim();
    const date = form.querySelector('#res-date').value;
    const time = form.querySelector('#res-time').value;
    const guests = form.querySelector('#res-guests').value;
    const notesEl = form.querySelector('#res-notes');
    const notes = notesEl ? notesEl.value.trim() : '';

    const code = generateBookingCode();
    const dateObj = date ? new Date(date + 'T00:00:00') : null;
    const dateDisplay = dateObj ? (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear() : date;

    function row(label, value) {
      if (!value) return '';
      return '<div class="invoice-row"><span>' + label + '</span><span>' + value + '</span></div>';
    }

    const invoiceHtml =
      '<div class="cart-drawer-header"><h3>Your Reservation</h3><button class="cart-close" aria-label="Close">×</button></div>' +
      '<div class="cart-drawer-body">' +
        '<div class="invoice-box" style="margin:20px 0 0;">' +
          '<div class="invoice-row head"><span>Booking Ref</span><span>#' + code + '</span></div>' +
          '<div class="invoice-divider"></div>' +
          row('Name', name) +
          row('Phone', phone) +
          row('Date', dateDisplay) +
          row('Time', time) +
          row('Guests', guestLabel(guests)) +
          (notes ? '<div class="invoice-divider"></div><div class="invoice-row"><span>Notes</span><span style="text-align:right;max-width:60%;">' + notes + '</span></div>' : '') +
        '</div>' +
      '</div>' +
      '<div class="invoice-actions">' +
        '<button class="btn btn-primary btn-block" id="confirmReservationBtn">Confirm &amp; Book Table</button>' +
        '<button class="btn btn-outline btn-block" id="editReservationBtn">Back to Edit</button>' +
      '</div>';

    window.FoodHubDrawer.openWithContent(invoiceHtml);
    window.FoodHubDrawer.bindClose();

    document.getElementById('editReservationBtn').addEventListener('click', function () {
      window.FoodHubDrawer.close();
    });

    document.getElementById('confirmReservationBtn').addEventListener('click', function () {
      const confirmHtml =
        '<div class="cart-drawer-header"><h3>Your Reservation</h3><button class="cart-close" aria-label="Close">×</button></div>' +
        '<div class="cart-drawer-body">' +
          '<div class="order-confirm">' +
            '<div class="confirm-icon">✓</div>' +
            '<h3>Table Reserved!</h3>' +
            '<p>Thank you, ' + (name || 'guest') + '. We\'ve saved your table for ' + (dateDisplay || 'your chosen date') + (time ? ' at ' + time : '') + '. See you soon!</p>' +
          '</div>' +
        '</div>';
      window.FoodHubDrawer.openWithContent(confirmHtml);
      window.FoodHubDrawer.bindClose();
      form.reset();
    });

    return true;
  }

  function attachFormHandler(formId, successId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const successMsg = document.getElementById(successId);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (validateForm(form)) {
        if (formId === 'reservationForm' && showReservationInvoice(form)) {
          return; // invoice drawer handles the rest
        }
        if (successMsg) {
          successMsg.classList.add('show');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
        setTimeout(function () {
          if (successMsg) successMsg.classList.remove('show');
        }, 5000);
      }
    });

    // live-clear errors on input
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        const group = input.closest('.form-group');
        if (group) clearError(group);
      });
    });
  }

  attachFormHandler('reservationForm', 'reservationSuccess');
  attachFormHandler('contactForm', 'contactSuccess');
});
