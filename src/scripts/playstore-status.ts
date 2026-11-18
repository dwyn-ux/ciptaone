type OrderStatus = {
  ok: boolean;
  status?: 'pending' | 'paid' | 'failed' | 'not_found';
  orderId?: string;
  reference?: string;
  packageName?: string;
  amount?: number;
  appName?: string;
  paidAt?: string;
};

const body = document.querySelector<HTMLElement>('#status-body');
if (body) {
  const orderEl = document.querySelector<HTMLElement>('#order-id')!;
  const referenceEl = document.querySelector<HTMLElement>('#reference')!;
  const refreshBtn = document.querySelector<HTMLButtonElement>('#refresh-btn')!;
  const params = new URLSearchParams(window.location.search);

  let orderId = params.get('order') || params.get('merchantOrderId') || sessionStorage.getItem('ciptaone-order') || '';
  const reference = params.get('reference') || '';
  let attempts = 0;
  const maxAttempts = 12;

  const lang = () => document.documentElement.lang === 'id' ? 'id' : 'en';

  const renderState = (data: OrderStatus) => {
    const id = lang();
    const status = data.status ?? 'not_found';
    const state = document.createElement('div');
    state.className = 'state';

    const mark = document.createElement('div');
    mark.className = 'state-mark' + (status === 'paid' ? '' : status === 'pending' ? ' pending' : ' failed');
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = status === 'paid' ? '✓' : status === 'pending' ? '…' : '×';

    const title = document.createElement('h1');
    title.className = 'state-title';

    const desc = document.createElement('p');
    desc.className = 'state-desc';

    if (status === 'paid') {
      title.textContent = id === 'id' ? 'Pembayaran diterima.' : 'Payment received.';
      desc.textContent = id === 'id'
        ? `Terima kasih! Pesanan ${data.packageName ?? ''} untuk ${data.appName ?? 'aplikasi kamu'} sudah terkonfirmasi. Tim kami akan menghubungi kamu via email dan WhatsApp dengan checklist persiapan.`
        : `Thank you! Your ${data.packageName ?? ''} order for ${data.appName ?? 'your app'} is confirmed. We will email and WhatsApp you with the handover checklist.`;
      const list = document.createElement('ul');
      list.className = 'state-list';
      const items = id === 'id'
        ? ['Cek email kamu (termasuk folder spam).', 'Siapkan AAB/APK, ikon 512×512, dan screenshot.', 'Kami mulai dalam 1 hari kerja setelah dokumen lengkap.']
        : ['Check your inbox (including spam).', 'Prepare your AAB/APK, 512×512 icon, and screenshots.', 'We start within one working day once the handover is complete.'];
      items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      state.append(mark, title, desc, list);
      refreshBtn.hidden = true;
    } else if (status === 'pending') {
      title.textContent = id === 'id' ? 'Menunggu pembayaran.' : 'Waiting for payment.';
      desc.textContent = id === 'id'
        ? 'Duitku belum mengirim konfirmasi. Kalau kamu sudah membayar, tunggu beberapa saat — notifikasi biasanya masuk beberapa menit setelah pembayaran. Halaman ini akan mengecek ulang otomatis.'
        : 'Duitku has not confirmed the payment yet. If you already paid, give it a moment — notifications usually arrive within minutes. This page will check again automatically.';
      state.append(mark, title, desc);
    } else if (status === 'failed') {
      title.textContent = id === 'id' ? 'Pembayaran gagal / kedaluwarsa.' : 'Payment failed or expired.';
      desc.textContent = id === 'id'
        ? 'Pesanan ini tidak jadi dibayar atau sudah melewati batas waktu. Kamu bisa membuat pesanan baru dari halaman layanan.'
        : 'This order was not paid or has expired. You can create a new order from the service page.';
      state.append(mark, title, desc);
      refreshBtn.hidden = true;
    } else {
      title.textContent = id === 'id' ? 'Pesanan tidak ditemukan.' : 'Order not found.';
      desc.textContent = id === 'id'
        ? 'Kami tidak menemukan data pesanan di perangkat ini. Cek tautan dari email / WhatsApp kamu, atau hubungi kami.'
        : 'We could not find the order on this device. Check the link in your email / WhatsApp, or contact us.';
      state.append(mark, title, desc);
      refreshBtn.hidden = true;
    }

    body!.replaceChildren(state);
  };

  const renderError = () => {
    const state = document.createElement('div');
    state.className = 'state';
    const mark = document.createElement('div');
    mark.className = 'state-mark failed';
    mark.textContent = '!';
    const title = document.createElement('h1');
    title.className = 'state-title';
    title.textContent = lang() === 'id' ? 'Status belum bisa dicek.' : 'Status is unavailable.';
    const desc = document.createElement('p');
    desc.className = 'state-desc';
    desc.textContent = lang() === 'id'
      ? 'Koneksi ke server pembayaran terganggu. Coba tombol cek ulang, atau hubungi kami via WhatsApp.'
      : 'Could not reach the payment server. Try checking again, or contact us on WhatsApp.';
    state.append(mark, title, desc);
    body!.replaceChildren(state);
  };

  const check = async () => {
    if (!orderId) {
      orderEl.textContent = '—';
      renderState({ ok: true, status: 'not_found' });
      return;
    }

    refreshBtn.disabled = true;
    try {
      const response = await fetch(`/api/duitku/status.php?order=${encodeURIComponent(orderId)}`, { headers: { Accept: 'application/json' } });
      const data: OrderStatus = await response.json();
      if (!response.ok || !data.ok) throw new Error('Status unavailable');
      orderEl.textContent = data.orderId ?? orderId;
      referenceEl.textContent = data.reference ?? reference ?? '—';
      renderState(data);
      if (data.status === 'pending' && attempts < maxAttempts && !document.hidden) {
        attempts += 1;
        window.setTimeout(() => void check(), 5000);
      }
    } catch {
      renderError();
    } finally {
      refreshBtn.disabled = false;
    }
  };

  refreshBtn.addEventListener('click', () => {
    attempts = 0;
    void check();
  });

  void check();
}
