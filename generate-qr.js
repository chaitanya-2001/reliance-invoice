const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const publicUrl = 'https://reliance-invoice.vercel.app';
const altUrl = 'https://reliance-invoice-mvg31wfmh-chaitanya-kumar-ponalis-projects.vercel.app';

async function generate() {
  const artifactDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\a51866fd-12a5-47d1-85e5-125566ce6244';
  const assetPath = path.join(__dirname, 'assets', 'qrcode.png');
  const artifactPath = path.join(artifactDir, 'reliance_invoice_qr.png');

  const options = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1.0,
    margin: 2,
    width: 600,
    color: {
      dark: '#004d9c',
      light: '#ffffff'
    }
  };

  await QRCode.toFile(assetPath, publicUrl, options);
  console.log('Generated asset QR:', assetPath);

  await QRCode.toFile(artifactPath, publicUrl, options);
  console.log('Generated artifact QR:', artifactPath);
}

generate().catch(err => console.error(err));
