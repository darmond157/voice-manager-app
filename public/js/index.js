function getVoice(page, count) {

    let table = $("#voiceList tbody");
    // todo : api for get previous voice
    table.empty();
    let outPut = '';

    let i =0;
    while (i<10){
        outPut += `<tr>
                    <td>${i + 1}</td>
                    <td>تضویحات ددلاین موبایل</td>
                    <td>${moment().format("jYYYY/jMM/jDD - HH:mm")}</td>
                    <td><audio id="myAudio" controls src="voice/test.mp3" controlslist="nodownload noplaybackrate">
                     
                    </audio></td>

                    <td class="testHashtag" style="min-width:200px">این صدا مربوط می شود به #توضیحات ددلاین موبایل که #استاد سر کلاس دادند</td>
                    <td>
                        <div class="list-icons">
                            <div class="dropdown">
                                <a href="#" class="list-icons-item dropdown-toggle d-flex justify-content-end" data-toggle="dropdown">
                                    <i class="icon-cog6"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a href="../voice/test.mp3" download class="dropdown-item">
                                        <i class="icon-download icon_download"></i>دانلود
                                    </a>
                                    <a tag="${i}" class="dropdown-item deleteVoice">
                                        <i class="icon-trash icon_delete"></i>حذف
                                    </a>
  

                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`
        i =i+1
    }



    table.append(outPut);
    newPaginate(25, count, "p-voices", getVoice, 1)
    changehashtag()


}
getVoice(1,10)
function showSwalMessageWithConfirm(message_string, options, function_call_back, extra_data) {

    let messageText = (message_string) ? message_string : "متاسفانه مشکلی رخ داده است لطفا مجددا تلاش کنید.";
    let    typeMessage;
    let    confirmButtonText = "تایید";
    let    cancelButtonText = "انصراف";
    if (options) {
        if (typeof options === "object") {
            typeMessage = options.type_message;
            confirmButtonText = options.button_text.confirm;
            cancelButtonText = options.button_text.cancel;
        } else {
            typeMessage = options;
        }
    } else {
        typeMessage = "error";
    }
    Swal.fire({
        text: messageText,
        icon: typeMessage,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
    }).then((result, isConfirm) => {
        if (result.value) {
            (extra_data) ? function_call_back(extra_data) : function_call_back();
        } else {

        }
    });
}

$("#voiceList").on('click', ".deleteVoice", function (e) {
    let index = parseInt($(this).attr('tag'));
    console.log(index)
    showSwalMessageWithConfirm('آیا از حذف این صدا اطمینان دارید؟', 'warning', deleteVoice, index)
})
function deleteVoice(){
//     todo : api for delete voice
}


function hashtagClick(inp){
    document.getElementById('filterVoice').classList.remove('d-none')
    console.log(inp)
}
$('#filterVoice').on('click',function (){
    document.getElementById('filterVoice').classList.add('d-none')
})
function changehashtag(){
    const tds = document.querySelectorAll('.testHashtag');
    let j = 0;
    while (j < tds.length){
        let paragraph = tds[j]
        const words = paragraph.innerHTML.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (words[i].startsWith('#')) {
                let a = words[i]
                words[i] = `<span style='color: #064aaf;cursor: pointer' onclick="hashtagClick('${a}')">${words[i]}</span>`;
            }
        }

        paragraph.innerHTML = words.join(' ');
        j = j+1
    }

}