
var paperWidth = 794;
var paperHeight = 1200;
var body = $(document.body);
var previewContainer = $('#preview_container').css({ 'max-width': paperWidth, 'margin': 'auto', width: paperWidth});

// var overlay = $('<div>').css({ 'position': 'fixed', 'background': '#00000036', 'top': '0', 'bottom': '0', 'right': '0', 'left': '0', 'backdrop-filter': 'blur(3px)' });
// body.prepend(overlay);

var boxDownload = $('<div>')
body.append(boxDownload);

var btnDownload = $('button.testing')

//
// btnDownload.append('<svg viewBox="0 0 102.5 122.88" style="width: 23px;margin: 0 5px;"><g><path fill="currentColor" d="M69.78,0.72C69.3,0.29,68.62,0,67.95,0c-0.14,0-0.29,0-0.43,0.05l-61.42,0c-1.64,0-3.19,0.68-4.3,1.79 C0.68,2.95,0,4.45,0,6.14v110.65c0,1.69,0.68,3.19,1.79,4.3c1.11,1.11,2.61,1.79,4.3,1.79c31.03,0,59.35,0,90.22,0 c1.69,0,3.19-0.68,4.3-1.79c1.11-1.11,1.79-2.61,1.79-4.3V35.52c0.05-0.24,0.1-0.43,0.1-0.68c0-0.82-0.39-1.55-0.92-2.08 L70.12,0.92c-0.1-0.1-0.15-0.14-0.24-0.19H69.78L69.78,0.72z M48.51,83.75V48.86c0-1.49,1.2-2.69,2.73-2.69 c1.49,0,2.73,1.2,2.73,2.69v34.86l12.52-10.93c1.11-0.98,2.82-0.89,3.8,0.22c0.98,1.11,0.89,2.79-0.22,3.77L53.05,91.64 c-1.05,0.92-2.6,0.89-3.61-0.03L32.45,76.77c-1.11-0.98-1.24-2.66-0.22-3.77c0.98-1.11,2.69-1.2,3.8-0.22l12.52,10.93L48.51,83.75 L48.51,83.75z M65.19,5.51v23.83c0,2.27,0.92,4.35,2.42,5.85c1.5,1.5,3.58,2.42,5.85,2.42h23.39v79.19c0,0.15-0.05,0.34-0.19,0.43 c-0.1,0.1-0.24,0.19-0.43,0.19c-24.57,0-66.28,0-90.18,0c-0.15,0-0.34-0.05-0.43-0.19c-0.1-0.1-0.19-0.29-0.19-0.43V6.14 c0-0.19,0.05-0.34,0.19-0.43c0.1-0.1,0.24-0.19,0.43-0.19h59.1H65.19L65.19,5.51z M70.65,29.34V9.38l22.47,22.76H73.45 c-0.77,0-1.45-0.34-1.98-0.82C70.99,30.83,70.65,30.11,70.65,29.34L70.65,29.34z"/></g></svg>');
//
// boxDownload.append($('<div>').css({ 'font-size': '17px', 'margin-bottom': '10px', }).text(downloadFileData.title), btnDownload);

btnDownload.click(function () {
    previewContainer.removeClass('d-none')
    window.scrollTo(0, 0);
    if (downloadFileData.type == 'pdf') {

        html2canvas(previewContainer[0], {
            scale: 2, dpi: 300, width: previewContainer.width(),
            height: previewContainer.height()
        }).then(function (canvas) {

            window.jsPDF = window.jspdf.jsPDF;
            var pdf = new jsPDF('p', 'mm', 'a4');
            var pageWidth = pdf.internal.pageSize.getWidth();
            var pageHeight = pdf.internal.pageSize.getHeight();

            for (var i = 0; i <= canvas.height / ((paperHeight * 2) + 400) ; i++) {

                var onePageCanvas = document.createElement("canvas");
                onePageCanvas.setAttribute('width', paperWidth);
                onePageCanvas.setAttribute('height', paperHeight + 100);

                var ctx = onePageCanvas.getContext('2d');

                ctx.drawImage(canvas, 0, paperHeight * i*2, paperWidth*2, paperHeight*2, 0, 0, paperWidth, paperHeight);

                var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                if (i > 0) {
                    pdf.addPage();
                }

                var ratio = pageWidth / paperWidth;

                pdf.setPage(i + 1);
                pdf.addImage(canvasDataURL, 'PNG', 0, 0, paperWidth * ratio, paperHeight * ratio);
            }
            pdf.save(downloadFileData.name + '.' + downloadFileData.type);

        });


    } else {


        html2canvas(previewContainer[0], {
            scale: 2, dpi: 300, width: previewContainer.width(),
            height: previewContainer.height()
        }).then(function (canvas) {
            var link = document.createElement("a");
            link.download = downloadFileData.name + '.' + downloadFileData.type;
            canvas.toBlob(function (blob) {
                link.href = URL.createObjectURL(blob);
                link.click();
            });
        });


    }
    previewContainer.addClass('d-none')
    return false;
});