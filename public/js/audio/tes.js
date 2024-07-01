// Record plugin

import WaveSurfer from './wavesurfer.esm.js'
import RecordPlugin from './record.esm.js'
let wavesurfer2, record
let scrollingWaveform = true

const createWaveSurfer = () => {
    // Create an instance of WaveSurfer
    if (wavesurfer2) {
        wavesurfer2.destroy()
    }
    wavesurfer2 = WaveSurfer.create({
        container: '#mic',
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
    })

    // Initialize the Record plugin
    record = wavesurfer2.registerPlugin(RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false }))
    // Render recorded audio
    record.on('record-end', (blob) => {
        const container = document.querySelector('#recordings')
        const recordedUrl = URL.createObjectURL(blob)
        container.innerHTML = ''
        // Create wavesurfer from the recorded audio
        const wavesurfer = WaveSurfer.create({
            container,
            waveColor: 'rgb(200, 100, 0)',
            progressColor: 'rgb(100, 50, 0)',
            url: recordedUrl,
        })

        // Play button
        const button = container.appendChild(document.createElement('button'))
        button.textContent = 'Play'
        button.classList.add('btn')
        button.classList.add('btn-outline-primary')
        button.classList.add('mr-2')
        button.onclick = () => wavesurfer.playPause()
        wavesurfer.on('pause', () => (button.textContent = 'Play'))
        wavesurfer.on('play', () => (button.textContent = 'Pause'))

        // Download link
        const link = container.appendChild(document.createElement('a'))
        Object.assign(link, {
            href: recordedUrl,
            download: 'recording.' + blob.type.split(';')[0].split('/')[1] || 'webm',
            textContent: 'Download recording',
        })
        link.classList.add('btn')
        link.classList.add('btn-outline-secondary')
        // wavesurfer.load(url);
        console.log(blob)
        // Create a File object from the blob
        var file = new File([blob], 'recording.mp3', { type: 'audio/mp3' });
        mode1RecordBlob = blob;
        console.log(file)
        fileeeeeeeeeeee = file
        // loadAudio()
    })
    pauseButton.style.display = 'none'
    recButton.textContent = 'Record'

    record.on('record-progress', (time) => {
        updateProgress(time)
    })
}

const progress = document.querySelector('#progress')
const updateProgress = (time) => {
    // time will be in milliseconds, convert it to mm:ss format
    const formattedTime = [
        Math.floor((time % 3600000) / 60000), // minutes
        Math.floor((time % 60000) / 1000), // seconds
    ]
        .map((v) => (v < 10 ? '0' + v : v))
        .join(':')
    progress.textContent = formattedTime
}

const pauseButton = document.querySelector('#pause')
pauseButton.onclick = () => {
    if (record.isPaused()) {
        record.resumeRecording()
        pauseButton.textContent = 'Pause'
        return
    }

    record.pauseRecording()
    pauseButton.textContent = 'Resume'
}

const micSelect = document.querySelector('#mic-select')
{
    // Mic selection
    RecordPlugin.getAvailableAudioDevices().then((devices) => {
        devices.forEach((device) => {
            const option = document.createElement('option')
            option.value = device.deviceId
            option.text = device.label || device.deviceId
            micSelect.appendChild(option)
        })
    })
}
// Record button
const recButton = document.querySelector('#record')

recButton.onclick = () => {
    if (record.isRecording() || record.isPaused()) {
        record.stopRecording()
        recButton.textContent = 'Record'
        pauseButton.style.display = 'none'
        return
    }

    recButton.disabled = true

    // reset the wavesurfer instance

    // get selected device
    const deviceId = micSelect.value
    record.startRecording({ deviceId }).then(() => {
        recButton.textContent = 'Stop'
        recButton.disabled = false
        pauseButton.style.display = 'inline'
    })
}


createWaveSurfer()

document.getElementById('submit_file').addEventListener('click', async (event) => {
    let name_en = document.getElementById('voice_name_en').value;
    let name_fa = document.getElementById('voice_name_fa').value;
    let select_voice = document.getElementById('select_voice').value;
    let uploadedFile ;
    if (!name_en.trim().length){
        showSwalMessage('نام انگلیسی صدا خود را وارد کنید')
    } else if (!name_fa.trim().length){
        showSwalMessage('نام فارسی صدا خود را وارد کنید')
    } else {
        event.preventDefault();
        if (select_voice == 2){
            file256 = new File([blobmerge], `${name_en}.mp3`, { type: 'audio/mp3' });
            console.log(file256)
            uploadedFile = file256
        } else{
            if(isrecord){
                let file2 = new File([mode1RecordBlob], `${name_en}.webm`, { type: 'audio/webm' });
                console.log(file2)
                uploadedFile = file2
            } else {
                const fileInput = document.getElementById('audio-file');
                uploadedFile = fileInput.files[0];
            }




            console.log(uploadedFile)
        }


        const formData = new FormData();
        formData.append('file',uploadedFile);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                showSwalMessage('آپلود موفقیت آمیز بود','success')
                $('#modalMainVoice').modal('hide')
            } else {
                alert('File upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('File upload failed');
        }
    }

});

/*
<html>
  <h1 style="margin-top: 0">Press Record to start recording 🎙️</h1>

  <p>
    📖 <a href="https://wavesurfer.xyz/docs/classes/plugins_record.RecordPlugin">Record plugin docs</a>
  </p>

  <button id="record">Record</button>
  <button id="pause" style="display: none;">Pause</button>

  <select id="mic-select">
    <option value="" hidden>Select mic</option>
  </select>
  <label style="display:inline-block;"><input type="checkbox"  /> Scrolling waveform</label>
  <p id="progress">00:00</p>

  <div id="mic" style="border: 1px solid #ddd; border-radius: 4px; margin-top: 1rem"></div>

  <div id="recordings" style="margin: 1rem 0"></div>

  <style>
    button {
      min-width: 5rem;
      margin: 1rem 1rem 1rem 0;
    }
  </style>
</html>
*/
