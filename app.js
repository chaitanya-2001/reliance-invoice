document.addEventListener('DOMContentLoaded', () => {
  // Tab Switcher Logic
  const digitalTabBtn = document.getElementById('digitalTabBtn');
  const scannedTabBtn = document.getElementById('scannedTabBtn');
  const digitalInvoiceView = document.getElementById('digitalInvoiceView');
  const scannedInvoiceView = document.getElementById('scannedInvoiceView');

  if (digitalTabBtn && scannedTabBtn) {
    digitalTabBtn.addEventListener('click', () => {
      digitalTabBtn.classList.add('active');
      scannedTabBtn.classList.remove('active');
      digitalInvoiceView.style.display = 'block';
      scannedInvoiceView.style.display = 'none';
    });

    scannedTabBtn.addEventListener('click', () => {
      scannedTabBtn.classList.add('active');
      digitalTabBtn.classList.remove('active');
      digitalInvoiceView.style.display = 'none';
      scannedInvoiceView.style.display = 'block';
    });
  }

  // Current URL Detection & Display
  const currentUrl = window.location.href;
  const publicUrlDisplay = document.getElementById('publicUrlDisplay');
  if (publicUrlDisplay) {
    publicUrlDisplay.textContent = currentUrl;
  }

  // QR Code Generation
  const qrCanvas = document.getElementById('qrCanvas');
  if (qrCanvas) {
    generateQRCode(currentUrl, qrCanvas);
  }

  // Action Buttons
  const copyBtn = document.getElementById('copyUrlBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          Copied!
        `;
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  }

  const downloadQrBtn = document.getElementById('downloadQrBtn');
  if (downloadQrBtn && qrCanvas) {
    downloadQrBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'reliance-invoice-qr.png';
      link.href = qrCanvas.toDataURL('image/png');
      link.click();
    });
  }

  const printBtn = document.getElementById('printInvoiceBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const jsonBtn = document.getElementById('downloadJsonBtn');
  if (jsonBtn) {
    jsonBtn.addEventListener('click', () => {
      fetch('invoice-data.json')
        .then(res => res.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'reliance-invoice-37100345214371.json';
          a.click();
          URL.revokeObjectURL(url);
        })
        .catch(err => console.error('Error fetching JSON data:', err));
    });
  }
});

// QR Code Renderer function
function generateQRCode(text, canvas) {
  if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
    QRCode.toCanvas(canvas, text, {
      width: 200,
      margin: 2,
      color: {
        dark: '#004d9c',
        light: '#ffffff'
      }
    }, function (error) {
      if (error) console.error(error);
    });
  } else {
    // Canvas fallback rendering if QRCode global isn't ready
    setTimeout(() => {
      if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
        QRCode.toCanvas(canvas, text, {
          width: 200,
          margin: 2,
          color: {
            dark: '#004d9c',
            light: '#ffffff'
          }
        });
      }
    }, 500);
  }
}
