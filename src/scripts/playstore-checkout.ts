import { packages, formatIDR } from '../data/playstore';

type PaymentMethod = { code: string; name: string; fee: string; image?: string };

const form = document.querySelector<HTMLFormElement>('#release-form');
if (form) {
  const methodBox = document.querySelector<HTMLDivElement>('#payment-methods')!;
  const methodInput = document.querySelector<HTMLInputElement>('#payment-method')!;
  const errorBox = document.querySelector<HTMLParagraphElement>('#form-error')!;
  const submitBtn = document.querySelector<HTMLButtonElement>('#submit-btn')!;
  const summaryName = document.querySelector<HTMLElement>('#summary-name')!;
  const summaryDesc = document.querySelector<HTMLElement>('#summary-desc')!;
  const summaryPrice = document.querySelector<HTMLElement>('#summary-price')!;
  const packageInputs = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="package"]'));
  const whatsapp = 'https://wa.me/6281234567890?text=Halo%20Cipta%20One%2C%20saya%20mau%20tanya%20layanan%20rilis%20Play%20Store.';

  let methods: PaymentMethod[] = [];
  let loading = false;

  const currentLang = (): 'en' | 'id' => document.documentElement.lang === 'id' ? 'id' : 'en';

  const showError = (message: string) => {
    errorBox.textContent = message;
    errorBox.hidden = false;
  };

  const clearError = () => {
    errorBox.textContent = '';
    errorBox.hidden = true;
  };

  const selectedPackage = () => packages.find((p) => p.id === form.querySelector<HTMLInputElement>('input[name="package"]:checked')?.value) ?? packages[1];

  const updateSummary = () => {
    const pkg = selectedPackage();
    const lang = currentLang();
    summaryName.textContent = pkg.name;
    summaryDesc.dataset.en = pkg.summary.en;
    summaryDesc.dataset.id = pkg.summary.id;
    summaryDesc.textContent = pkg.summary[lang];
    summaryPrice.textContent = formatIDR(pkg.price);
  };

  const methodLabel = (method: PaymentMethod) => {
    const fee = method.fee === '0' || method.fee === '0.00' || !method.fee
      ? (currentLang() === 'id' ? 'Gratis' : 'Free')
      : (currentLang() === 'id' ? 'Biaya ' + method.fee : 'Fee ' + method.fee);
    return { name: method.name || method.code, fee };
  };

  const renderMethods = () => {
    methodBox.replaceChildren();

    if (!methods.length) {
      const note = document.createElement('p');
      note.className = 'methods-error';
      note.textContent = currentLang() === 'id'
        ? 'Daftar metode pembayaran belum tersedia. Pembayaran akan memakai metode default; atau hubungi kami via WhatsApp.'
        : 'Payment methods are unavailable right now. The default channel will be used, or contact us on WhatsApp.';
      const link = document.createElement('a');
      link.href = whatsapp;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = ' WhatsApp ↗';
      note.appendChild(link);
      methodBox.appendChild(note);
      methodInput.value = '';
      return;
    }

    methods.forEach((method, index) => {
      const label = document.createElement('label');
      label.className = 'method';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'method';
      input.value = method.code;
      input.checked = index === 0;

      const name = document.createElement('span');
      name.className = 'method-name';
      name.textContent = methodLabel(method).name;

      const fee = document.createElement('span');
      fee.className = 'method-fee';
      fee.textContent = methodLabel(method).fee;

      label.append(input, name, fee);
      methodBox.appendChild(label);
    });

    methodInput.value = methods[0].code;
    methodBox.addEventListener('change', () => {
      const checked = methodBox.querySelector<HTMLInputElement>('input[name="method"]:checked');
      if (checked) methodInput.value = checked.value;
    });
  };

  const loadMethods = async (amount: number) => {
    loading = true;
    methodBox.replaceChildren();
    const loadingEl = document.createElement('p');
    loadingEl.className = 'methods-loading mono';
    loadingEl.textContent = currentLang() === 'id' ? 'MENGAMBIL METODE PEMBAYARAN…' : 'LOADING PAYMENT METHODS…';
    methodBox.appendChild(loadingEl);

    try {
      const response = await fetch(`/api/duitku/methods.php?amount=${amount}`, { headers: { Accept: 'application/json' } });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'Methods unavailable');
      methods = Array.isArray(data.methods) ? data.methods : [];
    } catch {
      methods = [];
    } finally {
      loading = false;
      renderMethods();
    }
  };

  packageInputs.forEach((input) => {
    input.addEventListener('change', () => {
      clearError();
      updateSummary();
      void loadMethods(selectedPackage().price);
    });
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-select-package]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.dataset.selectPackage;
      const target = packageInputs.find((input) => input.value === id);
      if (target) {
        target.checked = true;
        target.dispatchEvent(new Event('change'));
      }
      document.querySelector('#checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  updateSummary();
  void loadMethods(selectedPackage().price);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();

    if (loading) {
      showError(currentLang() === 'id' ? 'Metode pembayaran masih dimuat.' : 'Payment methods are still loading.');
      return;
    }

    if (!form.reportValidity()) return;
    if (!methodInput.value) {
      showError(currentLang() === 'id' ? 'Pilih metode pembayaran dulu.' : 'Choose a payment method first.');
      return;
    }

    const data = new FormData(form);
    const payload = {
      package: data.get('package'),
      paymentMethod: data.get('paymentMethod'),
      name: data.get('name'),
      email: data.get('email'),
      whatsapp: data.get('whatsapp'),
      appName: data.get('appName'),
      category: data.get('category'),
      notes: data.get('notes')
    };

    submitBtn.disabled = true;
    const label = submitBtn.querySelector('span')!;
    const original = label.textContent;
    label.textContent = currentLang() === 'id' ? 'MEMBUAT INVOICE…' : 'CREATING INVOICE…';

    try {
      const response = await fetch('/api/duitku/create-invoice.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Payment could not be started.');
      sessionStorage.setItem('ciptaone-order', result.orderId);
      window.location.assign(result.paymentUrl);
    } catch (error) {
      const fallback = currentLang() === 'id'
        ? 'Pembayaran belum bisa dibuat. Coba lagi atau hubungi kami via WhatsApp.'
        : 'Could not start payment. Please try again or contact us on WhatsApp.';
      showError((error instanceof Error ? error.message : fallback) + ' — WhatsApp: ' + whatsapp);
      submitBtn.disabled = false;
      label.textContent = original;
    }
  });
}
