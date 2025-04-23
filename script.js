let videoStream;

function unlockBooth() {
  document.getElementById('paywall').style.display = 'none';
  document.getElementById('booth').style.display = 'block';

  // Start camera with high resolution
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'user',
      width: { ideal: 1920 },
      height: { ideal: 1080 }
    }
  })
  .then(stream => {
    videoStream = stream;
    const video = document.getElementById('video');
    video.srcObject = stream;
  })
  .catch(err => {
    alert('Camera access denied or not supported.');
    console.error(err);
  });
}

// Start countdown and take photo
function startCountdown() {
  const countdown = document.getElementById('countdown');
  let counter = 3;
  countdown.innerText = counter;
  countdown.style.display = 'block';

  const interval = setInterval(() => {
    counter--;
    if (counter === 0) {
      clearInterval(interval);
      countdown.style.display = 'none';
      takePhoto();
    } else {
      countdown.innerText = counter;
    }
  }, 1000);
}

// Take photo and overlay template
function takePhoto() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw camera frame
  context.drawImage(video, 0, 0);

  // Overlay branding (mock stock overlay)
  const overlay = new Image();
  overlay.src = 'https://i.imgur.com/yk9x0uF.png'; // sample transparent PNG overlay
  overlay.onload = () => {
    context.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    // Show canvas & buttons
    canvas.style.display = 'block';
    document.getElementById('download').href = canvas.toDataURL('image/png');
    document.getElementById('download').style.display = 'inline';
    document.getElementById('resetBtn').style.display = 'inline';
  };
}

function resetSession() {
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('download').style.display = 'none';
  document.getElementById('resetBtn').style.display = 'none';
  document.getElementById('consent').checked = false;
}

// Stop video stream (optional cleanup on navigation)
window.addEventListener("beforeunload", () => {
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
  }
});
