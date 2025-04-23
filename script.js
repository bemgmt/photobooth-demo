
function unlockBooth() {
  document.getElementById('paywall').style.display = 'none';
  document.getElementById('booth').style.display = 'block';
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.getElementById('video');
      video.srcObject = stream;
    });
}

function takePhoto() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);
  canvas.style.display = 'block';

  const downloadLink = document.getElementById('download');
  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.style.display = 'inline';
}
